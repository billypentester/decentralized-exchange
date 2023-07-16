import React, {useEffect} from 'react'
import Card from './../Utilities/Card'
import Seo from './../Utilities/Seo'

function Pools() {

  useEffect(() => {
    Seo({
      title: "Pools",
      description: "Pools page",
    })
  }, []);

  const content = [
    {
      image: "https://img.icons8.com/ios/50/null/swimming-pool.png",
      title: "Create Pool",
      text: "Create your own pool and earn liquidity mining rewards that are distributed to liquidity providers",
      button: "Create",
      link: "/pools/create"
    },
    {
      image: "https://img.icons8.com/ios/50/null/swimming-pool.png",
      title: "Check Liquidity",
      text: "Find out how much liquidity is in a pool and how much you can earn by providing liquidity",
      button: "Find",
      link: "/pools/liquidity"
    },
    {
      image: "https://img.icons8.com/ios/50/null/swimming-pool.png",
      title: "Top Pools",
      text: "Find the top pools by liquidity and volume and earn the most rewards by providing liquidity",
      button: "Explore",
      link: "/pools/top"
    },
  ]

  return (
    <div class="container" style={{ marginTop:'4rem' }}>

      <div class="py-5 text-center">
        <h1 class="display-6">Pools</h1>
      </div>

      <div class="d-flex mb-5 flex-wrap justify-content-center">
        {content.map((item, index) => (
          <Card key={index} image={item.image} title={item.title} text={item.text} button={item.button} link={item.link} />
        ))}
      </div>

    </div>
  )
}

export default Pools