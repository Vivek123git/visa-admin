import React, { useState, useEffect } from "react";
import s from "./../Events/event.module.css";
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
const ViewArticle = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setisLoading] = useState(false);
    const pagetype = location?.state?.pagetype;

    useEffect(() => {
        if (pagetype == "View") {
            const { category_name,image, article_like, article_view, article_comment, description, status,name } =
                location?.state?.data;
            console.log(location);
            setformdata({
                name: name,
                image:image,
                description: description,
                category_name: category_name,
                article_like: article_like,
                article_view: article_view,
                article_comment: article_comment,
                article_status: status,
            });
        }
    }, [location]);



    const [formdata, setformdata] = useState({
        name: "",
        image:"",
        description: "",
        category_name: "",
        article_like: "",
        article_view: "",
        article_comment: "",
        article_status: "",

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
                    <div style={{ display: "flex", padding: "20px" }}>
                        <div ><img style={{ height: "200px" }} src={formdata.image ? formdata.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} /></div>
                        <div style={{ padding: "20px", paddingTop: "0px" }}>
                            <p><span style={{ fontSize: "18px", fontWeight: "600" }}>Name - </span>{formdata.name}</p>
                            <p><span style={{ fontSize: "18px", fontWeight: "600" }}>Category Name - </span>{formdata.category_name}</p>
                            <p><span style={{ fontSize: "18px", fontWeight: "600" }}>Status- </span>{formdata.status}</p>
                            <p><span style={{ fontSize: "18px", fontWeight: "600" }}>Article Like - </span>{formdata.article_like}</p>
                            <p><span style={{ fontSize: "18px", fontWeight: "600" }}>Article Comment - </span>{formdata.article_comment}</p>
                            <p><span style={{ fontSize: "18px", fontWeight: "600" }}>Article View - </span>{formdata.article_view}</p>
                            
                        </div>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <p><span style={{ fontSize: "18px", fontWeight: "600" }}>Description - </span>{formdata.description}</p>
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

export default ViewArticle;
