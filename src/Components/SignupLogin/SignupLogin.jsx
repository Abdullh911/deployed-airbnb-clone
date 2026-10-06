import { useRecoilState } from "recoil";
import { currUser, isEnglish, langCode, showSignup, users } from "../../StateMangement/State";
import './SignupLogin.css'
import { useRef, useState } from "react";
import langs from '../../langs';
import { auth, db } from "../firebase";
import { setDoc, doc,getDoc  } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,getAuth, signInWithPopup, FacebookAuthProvider,GoogleAuthProvider } from "firebase/auth";
import Loader from "../Loader";
const SignupLogin = () => {
    let [english,setEnglish]=useRecoilState(isEnglish);
    let [lang,setLang]=useRecoilState(langCode);
    let [showS,setShowS]=useRecoilState(showSignup);
    let [curr,setCurr]=useRecoilState(currUser);
    let [usersList,setUsersList]=useRecoilState(users);
    let [load,setLoad]=useState(false);
    const social=['Facebook','Google','Apple'];
    const socialIcons=[<i class="fa-brands fa-facebook"></i>,<i class="fa-brands fa-google"></i>,<i class="fa-brands fa-apple"></i>]
    let emailref=useRef(null);
    let passref=useRef(null);
    let Fnameref=useRef(null);
    let Lnameref=useRef(null);
    async function authUsingProv(providerIndex){
        let provider;
        if(providerIndex==1){
            provider = new GoogleAuthProvider();
        }
        else if(providerIndex==0){
            provider = new FacebookAuthProvider();
        }
        signInWithPopup(auth, provider).then(async (result) => {
            console.log(result);
            const user = result.user;
            if (user) {
                const userDocRef = doc(db, "Users", user.uid);
                const userSnapshot = await getDoc(userDocRef);
                if(userSnapshot.exists()){
                    const foundUser = userSnapshot.data();
                    foundUser.uid=user.uid;
                    console.log(foundUser);
                    setCurr(foundUser);
                    localStorage.setItem('user', JSON.stringify(foundUser));
                }
                else{
                    let newUser = {
                        email: user.email,
                        password: "",
                        wishlist:[],
                        trips:[],
                        firstName: user.displayName,
                        lastName: ""
                    };
                    await setDoc(doc(db, "Users", user.uid),newUser);
                    newUser.uid = user.uid;
                    setCurr(newUser); 
                    localStorage.setItem('user', JSON.stringify(newUser));
                    
                }
                setShowS(0);
            }
          });

    }

    async function userAction() {
        if((!Fnameref.current.value || !Lnameref.current.value)&&showS==1){
            return;
        }
        if (showS == 1) {
            let newUser = {
                email: emailref.current.value,
                password: passref.current.value,
                wishlist:[],
                trips:[],
                firstName: Fnameref.current.value,
                lastName: Lnameref.current.value
            };
            try {
                setLoad(true)
                await createUserWithEmailAndPassword(auth, emailref.current.value, passref.current.value);
                const user = auth.currentUser;
                console.log(user);
                if (user) {
                    await setDoc(doc(db, "Users", user.uid),newUser);
                }
                console.log(newUser);
                newUser.uid = user.uid;
                setCurr(newUser); 
                localStorage.setItem('user', JSON.stringify(newUser));
                setLoad(false)
                setShowS(0); 
                } catch (error) {
                    setLoad(false)
                    console.log(error.message);
                }
             
        } 
        else if (showS == 2) {
            try {
                setLoad(true)
                await signInWithEmailAndPassword(auth, emailref.current.value, passref.current.value);
                const user = auth.currentUser;
                if (user) {
                    const userDocRef = doc(db, "Users", user.uid);
                    const userSnapshot = await getDoc(userDocRef);
                    if (userSnapshot.exists()) {
                        const foundUser = userSnapshot.data();
                        foundUser.uid=user.uid;
                        console.log(foundUser);
                        setCurr(foundUser);
                        localStorage.setItem('user', JSON.stringify(foundUser));
                    } else {
                        console.log("not found!");
                    }
                }
                setLoad(false)
                setShowS(0);
            } catch (error) {
                console.log(error.message);
                setLoad(false)
            }
        }
    }
    
    return ( 
        <div dir={`${english?'ltr':'rtl'}`} className="fixed w-full h-full z-[200]"> 
        {load&&<Loader/>}
            <div className="backdrop" />
            <div className="filterModal">
                <div className="head">
                    <div className='title'>
                        <p>{showS==1?langs[lang].sign_up:langs[lang].log_in}</p>
                    </div>
                    <div onClick={()=>{
                        setShowS(0);
                     }} className='close'>
                        <i class="text-[18px] fa-solid fa-xmark"></i>
                    </div>
                </div>
                <div className="logBody">
                    <h1 className="text-[22px] font-[Poppins] mb-7">
                        {langs[lang].welcomeToAirbnb}
                    </h1>
                    <div className="inputCont">
                        <div  className={`w-full gap-5 flex mb-5 ${showS==1?'':'hidden'}`}>
                            <input ref={Fnameref} placeholder={langs[lang].firstName} className="rounded-xl w-[45%]" type="text" />
                            <input ref={Lnameref} placeholder={langs[lang].lastName} className="rounded-xl w-[45%]" type="text" />
                        </div>
                        <input dir="ltr" ref={emailref} placeholder={langs[lang].email} type="text" className="rounded-t-xl"/>
                        <input dir="ltr" ref={passref} placeholder={langs[lang].password} type="text" className="rounded-b-xl" />
                    </div>
                    <p className="text-[11px] mb-3">
                        {langs[lang].messageAndDataRates}                   
                    </p>
                    <p className="mb-5 underline w-max cursor-pointer" onClick={()=>{
                        if(showS==1){
                            setShowS(2);
                        }
                        else{
                            setShowS(1);
                        }
                    }}>{showS==1?langs[lang].log_in:langs[lang].sign_up}</p>
                    <button onClick={userAction}>{showS==1?langs[lang].sign_up:langs[lang].log_in}</button>
                    <div className="divide relative mb-7">
                        <p className="or">or</p>
                    </div>
                    <div>
                        {social.map((x,index)=>(
                            <div onClick={()=>{
                                authUsingProv(index);
                            }} className="socialDiv">
                                {socialIcons[index]}
                                <p>{langs[lang].continueWith} {x}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
     );
}
 
export default SignupLogin;