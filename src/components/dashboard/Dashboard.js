import React from 'react';
import * as mutations from '../../graphql/mutations'
import * as queries from '../../graphql/queries';
import Amplify, {Auth, API, graphqlOperation } from 'aws-amplify';

class Dashboard extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            data: 0
        }
    }

    componentDidMount = async () => {
        
        Auth.currentAuthenticatedUser()
        .then(user => console.log(user.attributes))

        try{
            // const payload = {
            //     symbol: "addd"
            // }
            // const { data } = await API.graphql(graphqlOperation(mutations.createStock, {input: payload}));
            // console.log('this is data: ', data)

        }catch(error){
            console.log('this is error', error)
        }
    }


    render(){

        return(
            <div>
                <div className="left-page">

                </div>
                <div className="right-page">
                    <form>
                        
                    </form>
                </div>
            </div>
        )
    }
}

export default Dashboard;