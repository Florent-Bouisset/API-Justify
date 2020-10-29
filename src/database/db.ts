import { Db, MongoClient} from "mongodb"

class Connection {
    db?: Db ;
    url= 'mongodb://localhost/'
    dbName =  process.env.DB_NAME || 'tictactrip';
    options = {
            bufferMaxEntries:   0,
            useNewUrlParser:    true,
            useUnifiedTopology: true,
        }
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async connectToMongo():Promise<any> {
        if (this.db) return this.db
        const client = await MongoClient.connect(this.url, this.options)
        this.db = client.db(this.dbName);

        return this.db
    }
}

export default Connection;

