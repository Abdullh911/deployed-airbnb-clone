const Shrunk = ({clicked,first,second,show}) => {
    return ( 
        <div onClick={clicked} className={`${show?'':'hidden'} flex justify-between p-4 bg-white rounded-2xl shadow-sm text-[14px]`}>
            <p className='text-[gray]'>{first}</p>
            <p>{second}</p>
        </div>
     );
}
 
export default Shrunk;