import React, {useEffect} from 'react'
import Card from './../Utilities/Card'
import Seo from './../Utilities/Seo'

function Tokens() {

  useEffect(() => {
    Seo({
      title: "Tokens",
      description: "Tokens page",
    })
  }, []);

  const content = [
    {
      image: "https://img.icons8.com/external-glyph-wichaiwi/64/null/external-token-digital-asset-glyph-wichaiwi.png",
      title: "Create Token",
      text: "Make your cryptocurrency by creating your own token in decenteralized exchange",
      button: "Create",
      link: "/tokens/create"
    },
    {
      image: "https://img.icons8.com/external-glyph-wichaiwi/64/null/external-token-digital-asset-glyph-wichaiwi.png",
      title: "Top Tokens",
      text: "Here are trending tokens that can be purchased and exchanged in this exchanges",
      button: "Explore",
      link: "/tokens/top"
    }
  ]

  return (
    <div className="container" style={{ marginTop:'4rem' }}>

      <div className="py-5 text-center">
        <h1 className="display-6">Tokens</h1>
      </div>

      <div className="d-flex mb-5 flex-wrap justify-content-center">
        {content.map((item, index) => (
          <Card key={index} image={item.image} title={item.title} text={item.text} button={item.button} link={item.link} />
        ))}
      </div>

    </div>
  )
}

export default Tokens