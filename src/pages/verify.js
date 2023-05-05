import axios from "axios"

export async function getServerSideProps(context){
    const {token}  = context.query
    if(token == undefined){
        return {
            notFound: true
        }
    } 
    else{
        axios.post("http://localhost:3000/api/verify",{
            token
        }).then().catch(function(error){
            alert(error)
        })
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
}
export default function Component() {
    
}