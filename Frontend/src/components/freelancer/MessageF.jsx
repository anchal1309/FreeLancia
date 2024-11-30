import Header from "./Header";
import Footer from "../Footer";
import ChatApp from "../chat/chatapp";
import ChatComponent from "../chat/chat";

export default function MessageF(){
    return(
        <div className="message">
        <Header/>
        <ChatComponent/>
        <Footer/>
        </div>
    );

}