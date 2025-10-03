interface SpamIndicators {
  suspiciousWords: string[];
  linkCount: number;
  capsRatio: number;
  repetitionScore: number;
  emailValid: boolean;
}

const suspiciousKeywords = [
  'viagra', 'cialis', 'casino', 'lottery', 'winner', 'congratulations',
  'click here', 'act now', 'limited time', 'free money', 'make money fast',
  'work from home', 'earn money', 'get rich', 'bitcoin', 'crypto', 'forex',
  'weight loss', 'lose weight', 'diet pills', 'miracle', 'cure',
  'hot singles', 'adult', 'xxx', 'porn',
  'prince', 'nigeria', 'inheritance', 'million dollars',
  'no credit check', 'bad credit', 'consolidate debt',
  'refinance', 'mortgage', 'loan',
];

export const detectSpam = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
}): number => {
  let spamScore = 0;
  const indicators: SpamIndicators = {
    suspiciousWords: [],
    linkCount: 0,
    capsRatio: 0,
    repetitionScore: 0,
    emailValid: true,
  };

  const fullText = `${data.subject} ${data.message}`.toLowerCase();

  // Check for suspicious keywords
  suspiciousKeywords.forEach(keyword => {
    if (fullText.includes(keyword)) {
      indicators.suspiciousWords.push(keyword);
      spamScore += 0.15;
    }
  });

  // Check for excessive links
  const linkRegex = /(https?:\/\/[^\s]+)/g;
  const links = data.message.match(linkRegex) || [];
  indicators.linkCount = links.length;
  if (links.length > 3) {
    spamScore += 0.2;
  }
  if (links.length > 5) {
    spamScore += 0.3;
  }

  // Check for excessive caps
  const capsCount = (data.message.match(/[A-Z]/g) || []).length;
  indicators.capsRatio = capsCount / data.message.length;
  if (indicators.capsRatio > 0.3) {
    spamScore += 0.2;
  }

  // Check for repetitive patterns
  const words = data.message.split(/\s+/);
  const wordCounts = new Map<string, number>();
  words.forEach(word => {
    const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (cleanWord.length > 3) {
      wordCounts.set(cleanWord, (wordCounts.get(cleanWord) || 0) + 1);
    }
  });

  let maxRepetition = 0;
  wordCounts.forEach(count => {
    if (count > maxRepetition) {
      maxRepetition = count;
    }
  });

  indicators.repetitionScore = maxRepetition / words.length;
  if (indicators.repetitionScore > 0.1) {
    spamScore += 0.15;
  }

  // Check email validity
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  indicators.emailValid = emailRegex.test(data.email);
  if (!indicators.emailValid) {
    spamScore += 0.3;
  }

  // Check for disposable email domains
  const disposableEmailDomains = [
    'tempmail.com', 'throwaway.email', 'guerrillamail.com', 
    'mailinator.com', '10minutemail.com', 'yopmail.com'
  ];
  const emailDomain = data.email.split('@')[1]?.toLowerCase();
  if (disposableEmailDomains.some(domain => emailDomain?.includes(domain))) {
    spamScore += 0.4;
  }

  // Check for gibberish in name
  if (data.name.length < 2 || !/^[a-zA-Z\s\-']+$/.test(data.name)) {
    spamScore += 0.1;
  }

  // Check message length
  if (data.message.length < 10 || data.message.length > 5000) {
    spamScore += 0.1;
  }

  // Check for phone number format if provided
  if (data.phone && !/^\+?[\d\s\-\(\)]+$/.test(data.phone)) {
    spamScore += 0.1;
  }

  // Honeypot field check (if implemented in frontend)
  // This would be a hidden field that bots fill out
  if ((data as any).honeypot) {
    spamScore = 1;
  }

  return Math.min(spamScore, 1);
};

export const generateSpamReport = (data: any): {
  isSpam: boolean;
  score: number;
  reasons: string[];
} => {
  const score = detectSpam(data);
  const reasons: string[] = [];
  
  if (score > 0.7) {
    reasons.push('High spam probability detected');
  }
  
  return {
    isSpam: score > 0.7,
    score,
    reasons,
  };
};
