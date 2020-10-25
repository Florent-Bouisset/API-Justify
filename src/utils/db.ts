import { MongoClient} from "mongodb"

class Connection {
    db = null;
    url= 'mongodb://localhost/'
    dbName =  'api';
    options = {
            bufferMaxEntries:   0,
            reconnectTries:     5000,
            useNewUrlParser:    true,
            useUnifiedTopology: true,
        }
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async connectToMongo():Promise<any> {
        if (this.db) return this.db
        const client = await MongoClient.connect(this.url, this.options)
        this.db = client.db('api');

        return this.db
    }
}

export default Connection;

