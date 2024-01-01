import styled from "styled-components";

import {Input} from "../../ui/Input";
import Form from "../../ui/Form";
import {Button} from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from 'react-hook-form'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";


function CreateCabinForm() {
  const {register,handleSubmit,reset,getValues,formState} = useForm()
  const queryClient =useQueryClient()
  // console.log(formState)
  const {errors} = formState
  // console.log(errors)
  const {mutate,isLoading:isCreating,} = useMutation({
    mutationFn:newCabin => createCabin(newCabin),
    onSuccess:()=>{
      toast.success('new cabin successfully created');
      queryClient.invalidateQueries({queryKey:['cabins']});
      reset() 
  },
 
  onError:err=>toast.error(err.message)

  })

  function onSubmit(data){
    // console.log(data)
    mutate({...data, image:data.image[0]})
  }

function onError(error){
// console.log(error)
}

  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)}>
      <FormRow label='cabin name' errors={errors?.name?.message} >

      <Input type="number" id="name"
      disabled ={isCreating}
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
        disabled ={isCreating}
         {...register('regularPrice',{required:'this field is required'})} />
      </FormRow>

      <FormRow label='Discount' errors={errors?.discount?.message} >
        <Input type="number" id="discount" defaultValue={0} 
         disabled ={isCreating}
         {...register('discount', {required:'this field is required',
         validate:value=>+value<+getValues().regularPrice || 
         'the discount price should be less than the regular price'})} />
      </FormRow>

      <FormRow label='description' errors={errors?.description?.message} >
        <Textarea type="number" id="description"
        disabled ={isCreating}
         defaultValue=""  {...register('description',
         {required:'this field is required'})}/>
      </FormRow>

      <FormRow label='Cabin Photo'> 
        {/* <Label htmlFor="image">Cabin photo</Label> */}
        <FileInput id="image" 
        accept="image/*"
        
        {...register("image",
         {required:'this field is required'})}
      
        />
      </FormRow>

      <FormRow >
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
