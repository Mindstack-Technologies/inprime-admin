import Header from "@/components/header";
import Footer from "@/components/footer";
import Navigation from "@/components/Navigation";

export default function AdminLayout({ children }) {
  return (
    <>
      <div className="row mx-0">
        <div className="col-lg-2 sideNav px-0">
          <Navigation></Navigation>
        </div>
        <div className="col-lg-10 offset-lg-2">
          <Header></Header>
          {children}
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}
