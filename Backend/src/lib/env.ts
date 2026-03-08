import "dotenv/config"

type env={
    PORT: number,
    DATABASE_URL : string,


}


const env= {
    PORT: parseInt(process.env.PORT||"4000"),
    DATABASE_URL : process.env.DATABASE_URL
}

export default env;