import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/dashboard/login",
  },
});

export const config = {
  // UBAH BARIS INI: 
  // Arti kode ini: "Kunci semua ruangan dashboard, KECUALI ruangan login dan register!"
  matcher: ["/dashboard/((?!login|register).*)"],
};