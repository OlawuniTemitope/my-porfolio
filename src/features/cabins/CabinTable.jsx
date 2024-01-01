// import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useQueryData from "./useQueryData";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";


// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;


function CabinTable() {
//  const {isLoading,data:cabins,error} = useQuery(
//     {
//       queryKey:['cabins'],
//       queryFn:getCabins
//     }
//   )
 const {isLoading,cabins}=useQueryData()
 const [searchParams] = useSearchParams()
 console.log(cabins)
 if(!cabins?.length) return <Empty resourceName='Cabin' />
//  filter
 const filterValue = searchParams.get('discount') || 'all'
 let filterCabing;
 if (filterValue==='all') 
 filterCabing= cabins
 if (filterValue==='no-discount')
  filterCabing= cabins?.filter(cabin=>cabin.discount === 0)
 if (filterValue==='with-discount') 
 filterCabing= cabins?.filter(cabin=>cabin.discount>0 )


///sort

const sortValue = searchParams.get('sortBy') || ''
console.log(sortValue)
const [field,direction] =sortValue.split('-')
const modifier = direction==='asc'?1: -1
console.log(filterCabing)

const sortedCabin = filterCabing?.sort((a,b)=>(a[field]-b[field])*modifier)



  if(isLoading) return <Spinner/>

  return (
    <Menus>
    <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body data={sortedCabin} render={(cabin)=>{return <CabinRow cabin={cabin}
       key={cabin.id} />}} />
    </Table>
    </Menus>
  )
}

export default CabinTable
 
 
 