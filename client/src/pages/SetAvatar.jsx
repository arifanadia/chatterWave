import axios from "axios";
import { Buffer } from "buffer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import loader from "../assets/loader.gif"
import useAxiosPublic from "../Hooks/useAxiosPublic";


const SetAvatar = () => {
    const avatarApi = "https://api.multiavatar.com/45678945"
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState();
    const [loading, setLoading] = useState(true)
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    useEffect(() => {
        if (!localStorage.getItem('chatterWave user')) {
            navigate('/login')
        }
    })

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error('Please select an avatar')
        } else {

            try {
                const user = await JSON.parse(localStorage.getItem("chatterWave user"))
                const { data } = await axiosPublic.post(`/users/set-avatar/${user._id}`, {
                    image: avatars[selectedAvatar]
                });

                console.log(data);

                if (data.isSet) {
                    user.isAvatarImageSet = true;
                    user.avatarImage = data.image;
                    localStorage.setItem("chatterWave user", JSON.stringify(user));


                }
                toast.success("Avatar set successfully!");
                navigate('/');


            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        const fetchAvatars = async () => {
            const data = []
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(`${avatarApi}/${Math.round(Math.random() * 1000)}`)
                const buffer = new Buffer.from(image.data)
                data.push(buffer.toString("base64"))
                // Add a delay of 1 second between each request to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 1000));

            }
            setAvatars(data);
            setLoading(false)


        }
        fetchAvatars()

    }, [])
    return (
        <>
            {
                loading ?
                    <Container>
                        <img src={loader} alt="loader" />
                    </Container> : (
                        <Container>
                            <div className="title-container">
                                <h1>Pick an avatar as your profile picture</h1>
                            </div>
                            <div className="avatars">
                                {
                                    avatars ?
                                        avatars.map((avatar, index) => (
                                            <div key={index} className={`avatar ${selectedAvatar === index ? 'selected' : ''}`}>
                                                <img
                                                    src={`data:image/svg+xml;base64,${avatar}`}
                                                    alt="avatar"
                                                    onClick={() => setSelectedAvatar(index)}
                                                />
                                            </div>
                                        ))
                                        : null
                                }
                            </div>
                            <button className="submit-btn" onClick={setProfilePicture}>Set as profile picture</button>

                        </Container>

                    )
            }

        </>
    );
};


const Container = styled.div`
  display  : flex ;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width:  100vw;
  .loader{
    max-inline-size: 100%;
  }

  .title-container{
    h1{
        color: white;
    }
  }
  .avatars{
    display: flex;
    gap: 2rem;
    .avatar{
        border: 0.4rem solid transparent;
        padding: 0.4rem;
        border-radius: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s ease-in-out;
    }
    img{
        height: 6rem;
    }
    .selected{
     border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn{
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover {
                background-color: #4e0eff;
            }
        }
`

export default SetAvatar;
