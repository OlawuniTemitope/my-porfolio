
import { Button } from "../../ui/Button"

import CreateCabinForm from "./CreateCabinForm"
import Modal from "../../ui/Modal"

function AtCabing(){
return <div>
     <Modal>
    <Modal.Open Opens='cabin-form'>
        <Button>Add new Cabin</Button>
    </Modal.Open>
    <Modal.Window name='cabin-form'>
        <CreateCabinForm/>
    </Modal.Window>
</Modal>
</div>
}


// function AtCabing() {
//     const [isOpenModal, setIsOpenModal]=useState(false)
//     return (
// <div>
     
//       <Button
//       onClick={()=>setIsOpenModal(show=>!show)}>Add new Cabin
//       </Button>
//       {isOpenModal && <Modal 
//       onCloseModel={()=> setIsOpenModal(false)}>
//         <CreateCabinForm onCloseModel={()=> setIsOpenModal(false)}  />
//         </Modal> }
//      </div>
    
//     )
// }

export default AtCabing
