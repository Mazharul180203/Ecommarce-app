import React from 'react';
import prisma from "@/lib/db/prisma";
import {redirect} from "next/navigation";

export const metadata={
    title: "Add Product - Saurav"
}

async function addProduct(formData: FormData){
    "use server"
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price") || 0);

    if(!name || !description|| !imageUrl || !price){
        throw Error ("Missing required fields")
    }

    await prisma.product.create({
        data: {name, description, imageUrl, price},
    });
    redirect("/");
}
const page = () => {
    return (
        <div>
            <h1 className='text-lg mb-3 font-bold'>Add Product</h1>
            <form action={addProduct}>
                <input required name="name" placeholder="name" className="input-bordered input mb-3 w-full" />
                <textarea required name="description" placeholder="description" className="textarea textarea-bordered mb-3 w-full"/>
                <input required name="imageUrl" placeholder="Image URL" type="url" className="input-bordered input mb-3 w-full" />
                <input required name="price" placeholder="price" type="number" className="input-bordered input mb-3 w-full" />
                <button className="btn btn-primary btn-block" type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default page;