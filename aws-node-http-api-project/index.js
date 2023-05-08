module.exports.handler = async (event) => {
  const Redis = require("ioredis");
  // const { default: Redlock } = require('redlock')
  const Redlock = require('redlock')
  
  const client = new Redis({
    port: 6380, // Redis port
    host: "127.0.0.1", // Redis host
    username: "default", // needs Redis >= 6
    // password: "my-top-secret",
    db: 0, // Defaults to 0
  })

  const querystring = event.queryStringParameters

  if(!querystring || !querystring.id) {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'need pass id querystring',
          date: new Date().getTime()
        },
        null,
        4
      )
    }
  }

  const redlockClient = new Redlock(
    [client],
    {
      driftFactor: 0.01,
      retryCount: 10,
      retryDelay: 200,
    }
  )

  const key = `key_${querystring.id}`
  
  try {
    console.log(redlockClient)

    const locked = await redlockClient.acquire([key], 5000)
  } catch (error) {
    
    console.log(error)

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: `already inserted ${querystring.id}`,
          date: new Date().getTime()
        },
        null,
        4
      )
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Inserted ${querystring.id}`,
        date: new Date().getTime()
      },
      null,
      4
    ),
  }
}
