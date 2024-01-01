
import {Input} from "../../ui/Input";
import Form from "../../ui/Form";
import {Button} from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from 'react-hook-form'
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";


function CreateCabinForm({cabinToEdit = {},onCloseModel}) {
  console.log(cabinToEdit)
  const {id:editId,...editValue}=cabinToEdit;
  console.log(editValue)
  const isEditSession=Boolean(editId)
  const {register,handleSubmit,reset,getValues,formState} = useForm({
   defaultValues: isEditSession?editValue:{}
  })

  // console.log(formState)
  const {errors} = formState
  const {createCabin,isCreating}=useCreateCabin()
  // console.log(errors)
  // const {mutate:createCabin,isLoading:isCreating,} = useMutation({
  //   mutationFn:newCabin => createEditCabin(newCabin),
  //   onSuccess:()=>{
  //     toast.success('new cabin successfully created');
  //     queryClient.invalidateQueries({queryKey:['cabins']});
  //     reset() 
  // },
 
  // onError:err=>toast.error(err.message)

  // })
  // const {mutate:editCabin,isLoading:isEditing,} = useMutation({
  //   mutationFn:({newCabin,id}) => createEditCabin(newCabin,id),
  //   onSuccess:()=>{
  //     toast.success('cabing eddited successfully');
  //     queryClient.invalidateQueries({queryKey:['cabins']});
  //     reset() 
  // },
 
  // onError:err=>toast.error(err.message)

  // })
  const {isEditing,editCabin}=useEditCabin()
  

  const isWorking = isCreating || isEditing


  function onSubmit(data){
    const image= typeof data.image==='string' ? data.image : data.image[0]
    if(isEditSession) editCabin({newCabin:{...data,image},id:editId},{
      onSuccess:(data)=>{reset()
        onCloseModel?.()
        }})
    // console.log(data)
  else
    createCabin({...data, image:image},{
  onSuccess:(data)=>{reset();
  onCloseModel?.();}
    })
  }

function onError(error){
// console.log(error)
}

  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)}
    type={onCloseModel? 'modal': 'regular'}
    >
      <FormRow label='cabin name' errors={errors?.name?.message} >

      <Input type="number" id="name"
      disabled ={isWorking}
         {...register('name',{required:'this field is required',
         min:{value:1,message:'capacity should be atleast 1'}})} />
      
      </FormRow>
      
      <FormRow label='Maximum Capacity' errors={errors?.maxCapacity?.message} >
        <Input type="number" id="maxCapacity"
         {...register('maxCapacity',{required:'this field is required',
         min:{value:1,message:'capacity should be atleast 1'}})} />
      </FormRow>

      <FormRow label='Regular Price' errors={errors?.regularPrice?.message} >
        <Input type="number" id="regularPrice"
        disabled ={isWorking}
         {...register('regularPrice',{required:'this field is required'})} />
      </FormRow>

      <FormRow label='Discount' errors={errors?.discount?.message} >
        <Input type="number" id="discount" defaultValue={0} 
         disabled ={isWorking}
         {...register('discount', {required:'this field is required',
         validate:value=>+value<+getValues().regularPrice || 
         'the discount price should be less than the regular price'})} />
      </FormRow>

      <FormRow label='description' errors={errors?.description?.message} >
        <Textarea type="number" id="description"
        disabled ={isWorking}
         defaultValue=""  {...register('description',
         {required:'this field is required'})}/>
      </FormRow>

      <FormRow label='Cabin Photo'> 
        {/* <Label htmlFor="image">Cabin photo</Label> */}
        <FileInput id="image" 
        accept="image/*"
        
        {...register("image",
         {required: isEditSession ? false : 'this field is required'})}
      
        />
      </FormRow>

      <FormRow >
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={()=> onCloseModel?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession? 'Edit Cabin': 'Create New Cabing'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
