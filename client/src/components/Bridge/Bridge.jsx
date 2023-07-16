import React, {useEffect} from 'react'
import Card from './../Utilities/Card'
import Seo from './../Utilities/Seo'

function Bridge() {

  useEffect(() => {
    Seo({
      title: "Bridge",
      description: "Bridge page",
    })
  }, []);

  const content = [
    {
      image: "https://img.icons8.com/ios/50/null/bridge.png",
      title: "Use Bridge",
      text: "Gateway to other blockchains and tokens to use in the ecosystem by bridging them to the native token",
      button: "Use",
      link: "/bridge/use"
    },
    {
      image: "https://img.icons8.com/ios/50/null/bridge.png",
      title: "Liquidity to Bridge",
      text: "Provide liquidity to the bridge and earn rewards for providing liquidity to the bridge pool",
      button: "Find",
      link: "/bridge/liquidity"
    },
    {
      image: "https://img.icons8.com/ios/50/null/bridge.png",
      title: "Check Positions",
      text: "Check your positions in the bridge and see how much you have earned in rewards",
      button: "Check",
      link: "/bridge/positions"
    }
  ]

  return (
    <div class="container" style={{ marginTop:'4rem' }}>

      <div class="py-5 text-center">
        <h1 class="display-6">Bridge</h1>
      </div>

      <div class="d-flex mb-5 flex-wrap justify-content-center">
        {content.map((item, index) => (
          <Card key={index} image={item.image} title={item.title} text={item.text} button={item.button} link={item.link} />
        ))}
      </div>

    </div>
  )
}

export default Bridge