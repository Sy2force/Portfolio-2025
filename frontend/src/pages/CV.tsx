import CVViewer from '../components/CV/CVViewer'
import { SEO } from '../utils/seo'

const CV = () => {

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title="CV - Shaya Coca"
        description="Téléchargez mon CV complet - Digital Marketer & Full-Stack Developer"
      />
      
      <CVViewer />
    </div>
  )
}

export default CV
