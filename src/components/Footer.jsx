import heart from "../Icons/heart.png";
const Footer = () => {

    return (
        <>
            <div className="bg-slate-800 text-white flex flex-col justify-center items-center">
                <div className="logo font-bold text-white text-2xl">
                    <span className="text-green-500">&lt;</span>
                    Pass<span className="text-green-500">OP/&gt;</span>
                </div>

                <div className="flex justify-center items-center">
                    Created with <img src={heart} alt="" className="w-7 h-7 mx-2" /> by Aditya
                </div>
            </div>
        </>
    )
}

export default Footer;