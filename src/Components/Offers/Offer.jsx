const Offer = ({text,icon}) => {
    return ( 
        <div className="flex items-center gap-3">
            {icon}
            <p className="text-sm">{text}</p>
        </div>
     );
}
 
export default Offer;