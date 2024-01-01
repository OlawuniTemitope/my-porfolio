
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import {Input} from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import useSettings from './useSetting';
import useUpdateSetting from './useUpdateSetting';

function UpdateSettingsForm() {
  const {updateSetting,isUpdating} =useUpdateSetting()
  const {isLoading,settings:
    {minBookingLength,
      maxBookingLenght,
      breakFastPrice,
      maxGuestPerBooking} ={} }=useSettings()
      if(isLoading) <Spinner/>
      
      function handleUpdate(e,field){
        const {value}=e.target;
        if(!value) return
        updateSetting({[field]:value})

      }


  return (
    <Form>
      <FormRow  label='Minimum nights/booking' >
        <Input type='number' id='min-nights' 
        
        onBlur={e=>handleUpdate(e,'minBookingLength')} 
        defaultValue={minBookingLength} 
        disabled={isUpdating}/>
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' 
         onBlur={e=>handleUpdate(e,'maxBookingLengh')} 
         disabled={isUpdating}
         defaultValue={maxBookingLenght} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests'
        disabled={isUpdating} 
           onBlur={e=>handleUpdate(e,'maxGuestPerBooking')}
        defaultValue={maxGuestPerBooking} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price'
           onBlur={e=>handleUpdate(e,'breakFastPrice')}
           disabled={isUpdating}
        defaultValue={breakFastPrice} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
