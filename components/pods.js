import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import { createHttpLink } from "apollo-link-http";

const client = new ApolloClient({
  link: createHttpLink({
    uri: `${process.env.PODS_DISCOVERY_SERVICE_ENDPOINT}/graphql`,
    useGETForQueries: true
  }),
  cache: new InMemoryCache()
});

export function Pods() {

  console.log('current endpoint:', `${process.env.PODS_DISCOVERY_SERVICE_ENDPOINT}/graphql`, 'current env:', process.env.NODE_ENV)

  const GET_PODS_QUERY = gql`
    query GetPods {
      pods {
        id
        name
        address
        url
      }
    }`

  const { data, loading, refetch, error } =  useQuery(GET_PODS_QUERY, {
    client: client
  })


  if( loading ) {
    return (
      <div>
        <h4>Loading... 🚀</h4>
      </div>
    )
  }

  if( error ) {
    return (
      <div>
        <h4>Got error when loading pods locations 😞</h4>
      </div>
    )
  }

  return (
    <div className="grid">
      {
        data.pods.map(( { id, name, address, url } ) => {
            return <a
              key={id}
              href={url}
              className="card"
            >
              <h3>{ name }</h3>
              <p>
                { address }
              </p>
            </a>
          })
      }
    </div>
  );

}
