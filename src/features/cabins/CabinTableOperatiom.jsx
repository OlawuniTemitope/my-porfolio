import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'
import TableOperations from '../../ui/TableOperations'
function CabinTableOperatiom() {
    return (
        <TableOperations>
        <Filter filterField='discount'
         option={[{value:'all',label:'All'}
         ,{value:'no-discount',label:'No-discount'},
         {value:'with-discount',label:'With-discount'}]}
         />
         <SortBy options={
             [
                {value:'name-asc',label:'Sort by name (A-Z) '},
                {value:'name-desc',label:'Sort by name (Z-A) '},
                {value:'regularPrice-asc',label:'Sort by price (Low first) '},
                {value:'regularPrice-desc',label:'Sort by price (High first) '},
                {value:'maxCapacity-asc',label:'Sort by  maxCapacity (Low first) '},
                {value:'maxCapacity-desc',label:'Sort by maxCapacity (High first) '}
            ]
                
         }/>

        </TableOperations>
    
        )
}

export default CabinTableOperatiom
