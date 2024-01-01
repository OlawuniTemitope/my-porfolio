import supabase, { supabaseUrl } from './supabase'
export async function getCabins(){
    
const { data: cabins, error } = await supabase.from('cabins').select('*')
if(error) {console.error(error);
throw new Error('cabins could not be loaded')}
return cabins

}
export async function createEditCabin(newCabin,id){
    // https://vppenmbocxmiwvqxaktc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
    console.log(newCabin)
    const hasImagePath =newCabin.image?.startsWith?.(supabaseUrl)
    const imageName = 
    `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "")
    const imagePath = hasImagePath ?newCabin.image :
     `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
     let query =supabase
     .from('cabins')

    if(!id)
// const { data : cabins, error } = await supabase
// .from('cabins')
  query = query.insert([{...newCabin, image:imagePath}])
if(id)
 query = query.update({...newCabin, image:imagePath})
  .eq('id', id)
  .select()

const { data : cabins, error } = await query.select()
if(error) {console.error(error);
    throw new Error('cabins could not be created')}

    // .from('cabins')
    if(hasImagePath) return cabins
    



    ////////// upload cabin
    
// const avatarFile = event.target.files[0]
const {error:storageError } = await supabase
  .storage
  .from('cabin-images')
  .upload(imageName, newCabin.image,)

  //////// delete cabin if there was uploading error
    if (storageError){ await supabase
    .from('cabins')
    .delete()
    .eq('id', cabins.id)
    // console.log(storageError)
    throw new Error('fail to upload image and cabin was not created')
}
    return cabins

}

export async function deleteCabin (id){

    const {data:cabins, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)
    if(error) {console.error(error);
        throw new Error('cabins could not be deleted')}
        return cabins
        
}