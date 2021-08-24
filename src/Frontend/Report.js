import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'  
import { Container, FormLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Frontend/Report.css'
import { Link } from 'react-router-dom';
export default function Report(){
    const [isLoading, setLoading] = useState(true);
    const [items, setData] = useState([])
   
    //get data
    useEffect(() => {
        axios.get("http://127.0.0.1:8009/reports").then(response => {
          setData(response.data);
          setLoading(false);
        });
      }, []);
      if (isLoading) {
        return <div className="App">Loading...</div>;
      }

    //Update
    const  Update = (id) => {  
        console.log(id)
        axios.put('http://127.0.0.1:8009/reports/'+id).then(response => {  
                console.log(response.data); 
                window.location.reload(false);
        
        }); 
    }   
   
    //Block content
    const  BlockContent = (id) => {  
      axios.put('http://127.0.0.1:8009/reports/Block/'+id).then(response => {  
              console.log(response.data); 
              window.location.reload(false);
      
      }); 
  } 
  
        return items['elements'].filter(items=>items.payload['reportType']!="Blocked") .map(user => {
            return (
        <Container className="Container">
            <Row >
               <Col>
                 <FormLabel>ID :</FormLabel> <span>{user.payload['reportId']}</span>
              </Col>
                <Col>
                <FormLabel>TYPE :</FormLabel> <span>{user.payload['reportType']}</span>
                </Col>
                <Col>
                  <Button variant="danger" onClick={()=>BlockContent(user.payload['reportId'])} >Block</Button>
                </Col>
            </Row>
              
            <Row>
             <Col>
             <FormLabel>STATE :</FormLabel> <span>{user.state}</span>
                </Col>
               <Col>
               <FormLabel>Message :</FormLabel> <span>{user.payload['message']}</span>
              </Col>
               
                <Col>
                  <Button  onClick={()=>Update(user.payload['reportId'])}>Resolve</Button>
                </Col>
            </Row>
            <Row md={3}>
              <Col>
                <Link>Details</Link>
              </Col>
             
            </Row>
             </Container>
             
            )
          })
       
}