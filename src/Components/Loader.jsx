const Loader = () => {
    return ( 
        <div className="z-[60] flex justify-center items-center w-full h-full absolute bg-gray-500 bg-opacity-50">
            <div class="flex flex-row gap-2">
                <div class="w-4 h-4 rounded-full bg-[#ff385c]  animate-bounce"></div>
                    <div
                        class="w-4 h-4 rounded-full bg-[#ff385c] animate-bounce [animation-delay:-.3s]"
                    ></div>
                <div
                    class="w-4 h-4 rounded-full bg-[#ff385c]  animate-bounce [animation-delay:-.5s]"
                ></div>
            </div>
        </div>
    );
}
 
export default Loader;