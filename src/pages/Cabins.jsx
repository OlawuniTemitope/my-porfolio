
import CabinTable from "../features/cabins/CabinTable";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AtCabing from "../features/cabins/AtCabing";
import CabinTableOperatiom from "../features/cabins/CabinTableOperatiom";

function Cabins() {
  // const [showForm, setShowForm]=useState(false)
  
  return (
    <>    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>{<CabinTableOperatiom/>}</p>
     </Row>
     <Row>
     <CabinTable/>
     <AtCabing/>
     </Row>
     {/* <Row>
      <CabinTable/>
      <Button 
      onClick={()=>setShowForm(show=>!show)}>Add new Cabin
      </Button> 
      {showForm && <CreateCabinForm/> }
     </Row> */}
     </>

  );
}

export default Cabins;
