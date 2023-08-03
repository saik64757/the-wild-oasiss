import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    // console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    // console.log(error);
    throw new Error("Cabins could not be Deleted");
  }
}

export async function addCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  //https://ogkuohcmystgbmxuyphb.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create a Cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    throw new Error("Cabins could not be Created");
  }

  // 2 .Upload Image
  const { error: StorageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // console.log(StorageError);

  // 3.Delete the cabin if there is error uploading the image
  if (StorageError) {
    const { error } = await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabins image could not be uploaded hence Cabin was not created"
    );
  }
  return data;
}
