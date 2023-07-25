import React, { useState, useEffect } from "react";
import s from "./event.module.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Custombutton from "../../Common/Custombutton";
import { notificationHandler } from "../../utils/Notification";
import { blankValidator, emailValidator } from "../../utils/Validation";
import { useLocation } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import { article_add_api, article_update_api, category_list_api } from "../api/article";
import { add_event_api, update_event_api } from "../api/event";
import Loder from "../../Loder/Loder";
const ViewEvent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [AllCategories, setAllCategories] = useState([]);
    const [profileImg, setprofileImg] = useState();
    const [isLoading, setisLoading] = useState(false);
    const pagetype = location?.state?.pagetype;
    const place = location?.state?.data?.location;
    const id = location?.state?.data?.id;

    useEffect(() => {
        if (pagetype == "View") {
            const { category_name,image, category_id, couple_price, date, description, end_time, general_price, name, start_time, vip_price, user_name, date2 } =
                location?.state?.data;
            console.log(location);
            setformdata({
                name: name,
                description: description,
                image:image,
                category_id: category_id,
                date: date,
                date2: date2,
                start_time: start_time,
                end_time: end_time,
                general_price: general_price,
                couple_price: couple_price,
                vip_price: vip_price,
                location: place,
            });
        }

    }, [location]);

    
    const [formdata, setformdata] = useState({
        name: "",
        description: "",
        category_id: "",
        image:"",
        date: "",
        date2: "",
        start_time: "",
        end_time: "",
        general_price: "",
        couple_price: "",
        vip_price: "",
        location: "",
    });



   
    return (
        <>
            <div className="">
                <Card className={s["admin_container"]}>
                    <div className={s["title"]} onClick={() => navigate(-1)}>
                        <BiArrowBack />
                        Back
                    </div>
                    <div className={s["article-list-title"]}>
                        <h3>View Event</h3>
                    </div>
                    <div style={{display:"flex",padding:"20px"}}>
                        <div ><img style={{height:"200px"}} src={formdata.image?formdata.image:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} /></div>
                        <div style={{padding:"20px",paddingTop:"0px"}}>
                            <p><span style={{fontSize:"18px",fontWeight:"600" }}>Name - </span>{formdata.name}</p>
                            <p><span style={{fontSize:"18px",fontWeight:"600" }}>Date - </span>{formdata.date}</p>
                            <p><span style={{fontSize:"18px",fontWeight:"600" }}>Couple Price - </span>{formdata.couple_price}</p>
                            <p><span style={{fontSize:"18px",fontWeight:"600" }}>Start Time - </span>{formdata.start_time}</p>
                            <p><span style={{fontSize:"18px",fontWeight:"600" }}>End Time - </span>{formdata.end_time}</p>
                            <p><span style={{fontSize:"18px",fontWeight:"600" }}>Location - </span>{formdata.location}</p>
                            <p><span style={{fontSize:"18px",fontWeight:"600" }}>General Price - </span>{formdata.general_price}</p>
                        </div>
                    </div>
                    <div style={{marginTop:"20px"}}>
                    <p><span style={{fontSize:"18px",fontWeight:"600" }}>Description - </span>{formdata.description}</p>
                    </div>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid>
                            <div className="">

                            </div>
                        </Grid>
                    </Grid>


                </Card>
            </div>
            <Loder loading={isLoading} />
        </>
    );
};

export default ViewEvent;
