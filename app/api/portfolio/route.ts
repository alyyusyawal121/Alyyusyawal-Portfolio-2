import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb'; 
import Portfolio from '@/models/portfolio';    

// 1. Fungsi POST: Untuk MENAMBAH data portofolio baru ke database
export async function POST(request: Request) {
  try {
    // Menangkap data yang dikirim dari form website nantinya
const { title, description, imageUrl, category, technologies, projectUrl } = await request.json();
    
    await connectMongoDB(); 
    
    // 2. Tambahkan 'category' di sini agar API mau menyimpannya ke database
    await Portfolio.create({ title, description, imageUrl, category, technologies, projectUrl });
    
    return NextResponse.json({ message: "Data Portofolio Berhasil Ditambahkan! 🎉" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Gagal menambahkan data" }, { status: 500 });
  }
}

// 2. Fungsi GET: Untuk MENGAMBIL semua data portofolio dari database
export async function GET() {
  try {
    await connectMongoDB();
    
    // Mencari dan mengambil seluruh data portofolio yang ada
    const portfolios = await Portfolio.find(); 
    
    return NextResponse.json({ portfolios }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function DELETE(request: Request){
    try{
        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (!id){
            return NextResponse.json({message: "ID Portofolio harus disertakan"}, {status: 400});
        }
        await connectMongoDB();
        await Portfolio.findByIdAndDelete(id);

        return NextResponse.json({message:"Data Portfolio Berhasil Dihapus"}, {status:200});
    } catch(error) {
    console.error(error);
    return NextResponse.json({ message: "Gagal menghapus data" }, { status: 500 });
    }
}
export async function PUT(request: Request){
    try{
        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (!id){
            return NextResponse.json({message: "ID Portofolio harus disertakan"}, {status: 400});
        }
        // Collect the new data from body
        const newData = await request.json();

        await connectMongoDB();
        // Insert ID and New Data to the Mongoose 
        await Portfolio.findByIdAndUpdate(id, newData);

        return NextResponse.json({message:"Data Portfolio Berhasil Di Update"}, {status:200});
    } catch(error) {
    console.error(error);
    return NextResponse.json({ message: "Gagal Update data" }, { status: 500 });
    }
}