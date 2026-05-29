import "./styles/SubmitInquiry.css"

function SubmitInquiry({
    active,
    setActive
} : {
    active : null | boolean
    setActive : React.Dispatch<React.SetStateAction<null | boolean>>
}) {
    return(
        active !== null ? <div className={"SubmitInquiry ".concat(active ? "fade-in" : "fade-out")} style={{pointerEvents : active ? "all" : "none"}}>
            <div className="ModalBackground" onClick={() => setActive(false)}></div>
            <div className="Modal">
                <div className={"InnerModal ".concat(active ? "active" : "inactive")}>
                    <iframe
                        src="https://api.leadconnectorhq.com/widget/form/echH3wfL4qwvxigNL3ME"
                        style={{
                            display : "none",
                            width:"100%",
                            height:"100%",
                            border:"none",
                            borderRadius:"4px",
                            marginTop:"50px",
                            marginBottom:"50px",
                        }}
                        id="inline-echH3wfL4qwvxigNL3ME" 
                        data-layout="{'id':'INLINE'}"
                        data-trigger-type="alwaysShow"
                        data-trigger-value=""
                        data-activation-type="alwaysActivated"
                        data-activation-value=""
                        data-deactivation-type="leadCollected"
                        data-deactivation-value=""
                        data-form-name="Seller Site Form"
                        data-height="1681"
                        data-layout-iframe-id="inline-echH3wfL4qwvxigNL3ME"
                        data-form-id="echH3wfL4qwvxigNL3ME"
                        title="Seller Site Form" />
                </div>
            </div>
        </div> : null
    )
}

export default SubmitInquiry