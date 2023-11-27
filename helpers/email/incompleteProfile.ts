import { User } from "types/model"

export const sendIncompleteProfileEmail = (user: User) => {
    const name = user.first_name;

    return `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"><html><head><META http-equiv="Content-Type" content="text/html; charset=utf-8"><style>*{box-sizing:border-box}body{margin:0;padding:0}#m_MessageViewBody a{color:inherit;text-decoration:none}p{line-height:inherit}.m_desktop_hide,.m_desktop_hide table{display:none;max-height:0;overflow:hidden}.m_image_block img+div{display:none}@media (max-width:610px){.m_image_block img.m_big,.m_row-content{width:100%!important}.m_mobile_hide{display:none}.m_stack .m_column{width:100%;display:block}.m_mobile_hide{min-height:0;max-height:0;max-width:0;overflow:hidden;font-size:0}.m_desktop_hide,.m_desktop_hide table{display:table!important;max-height:none!important}}</style></head><body><u></u><div style="background-color:#f9f9f9;margin:0;padding:0"><table class="m_nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f9f9f9"><tbody><tr><td><table class="m_row m_row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr><td><table class="m_row-content m_stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="color:#000;width:590px" width="590"><tbody><tr><td class="m_column m_column-1" width="100%" style="font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><div class="m_spacer_block m_block-1" style="height:20px;line-height:20px;font-size:1px"> </div></td></tr></tbody></table></td></tr></tbody></table><table class="m_row m_row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr><td><table class="m_row-content m_stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#fff;color:#000;width:590px" width="590"><tbody><tr><td class="m_column m_column-1" width="100%" style="font-weight:400;text-align:left;padding-bottom:5px;padding-left:55px;padding-right:55px;padding-top:40px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="m_image_block m_block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"><tr><td class="m_pad" style="width:100%;padding-right:0;padding-left:0"><div class="m_alignment" align="left" style="line-height:10px"><img src="https://ci4.googleusercontent.com/proxy/IjoI4kafxrxwdlFFM6Pk1E90gmQIiik93hDjohhN05WckhOK8XmU6SgI5UkIBJjb6IXsovPZ53Vf4rZXFVnJtP5sGbMhngd3hso3FKgNOnmzWakYzZk3-Q=s0-d-e1-ft#https://wondor-assets.s3.us-east-2.amazonaws.com/wondor-logo-nobg.png" style="display:block;height:auto;border:0;width:144px;max-width:100%" width="144"></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table class="m_row m_row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr><td><table class="m_row-content m_stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#fff;color:#000;width:590px" width="590"><tbody><tr><td class="m_column m_column-1" width="100%" style="font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="m_text_block m_block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="word-break:break-word"><tr><td class="m_pad" style="padding-bottom:10px;padding-left:55px;padding-right:55px;padding-top:10px"><div style="font-family:sans-serif"><div style="font-size:14px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;color:#282f33;line-height:1.2"><p style="margin:0;font-size:14px"><span style="font-size:26px">Enhance Your Profile for Collaborative Success!</span></p></div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table class="m_row m_row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr><td><table class="m_row-content m_stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#fff;color:#000;width:590px" width="590"><tbody><tr><td class="m_column m_column-1" width="100%" style="font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="m_image_block m_block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"><tr><td class="m_pad" style="width:100%;padding-right:0;padding-left:0"><div class="m_alignment" align="center" style="line-height:10px"><img class="m_big" src="https://ci3.googleusercontent.com/proxy/yuXQFw7maHOTLvl65wAmCAMj2rw0YTUJoI20aJdvfdvPSRG_tgVre5Z7MWacg-nuhWus-6Qcbl0ykY3iHxbQBJBDf4VOS5sCQ1wvhYtAgA=s0-d-e1-ft#https://wondor-assets.s3.us-east-2.amazonaws.com/landing.png" style="display:block;height:auto;border:0;width:590px;max-width:100%" width="590"></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table class="m_row m_row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr><td><table class="m_row-content m_stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#fff;color:#000;width:590px" width="590"><tbody><tr><td class="m_column m_column-1" width="100%" style="font-weight:400;text-align:left;padding-bottom:30px;padding-top:15px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="m_text_block m_block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="word-break:break-word"><tr><td class="m_pad" style="padding-bottom:10px;padding-left:55px;padding-right:55px;padding-top:10px"><div style="font-family:Arial,sans-serif"><div style="font-size:14px;font-family:Arial,&#39;Helvetica Neue&#39;,Helvetica,sans-serif;color:#525252;line-height:1.5"><p style="margin:0;letter-spacing:normal">Dear ${name},</p><p style="margin:0;letter-spacing:normal"><br>We appreciate you for joining our platform. We have identified that your profile is incomplete. Please increase your collaborative success by completing your Wondor profile with these essential details:</p><p style="margin:0;letter-spacing:normal"> </p><p style="margin:0;letter-spacing:normal"><strong>Bio</strong>: Share your artistic journey, inspirations, and aspirations.
</p><p style="margin:0;letter-spacing:normal"><br></p><p style="margin:0;letter-spacing:normal"> </p><p style="margin:0;letter-spacing:normal"><strong>Skills</strong>: Highlight your expertise and attract like-minded collaborators.</p><p style="margin:0;letter-spacing:normal"><br></p><p style="margin:0;letter-spacing:normal"></p><p style="margin:0;letter-spacing:normal"><br></p><p style="margin:0;letter-spacing:normal"><strong>Link Social Media:</strong> Connect your platforms for a holistic online presence.</p><p style="margin:0;letter-spacing:normal"><br></p><p style="margin:0;letter-spacing:normal"> </p><p style="margin:0;letter-spacing:normal"><strong>Collaboration Preference:</strong> Specify if you are available to collaborate.</p><p style="margin:0;letter-spacing:normal"><br></p><p style="margin:0;letter-spacing:normal"> </p></div></div></td></tr></table><table class="m_button_block m_block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation"><tr><td class="m_pad"><div class="m_alignment" align="center">

<a href="https://www.google.com/url?q=https://www.wondor.art/portal/profile&amp;source=gmail-html&amp;ust=1687804264971000&amp;usg=AOvVaw3RGRBNl88AcokvFv4tNUfE" style="text-decoration:none;display:inline-block;color:#f9f9f9;background-color:#44aee0;border-radius:6px;width:auto;border-top:0px solid transparent;font-weight:undefined;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:Arial,&#39;Helvetica Neue&#39;,Helvetica,sans-serif;font-size:14px;text-align:center;word-break:keep-all" target="_blank" rel="noreferrer"><span style="padding-left:20px;padding-right:20px;font-size:14px;display:inline-block;letter-spacing:normal"><span style="word-break:break-word"><span style="line-height:28px">Complete Your Profile
<br></span></span></span></a></div></td></tr></table><table class="m_text_block m_block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="word-break:break-word"><tr><td class="m_pad" style="padding-bottom:10px;padding-left:55px;padding-right:55px;padding-top:10px"><div style="font-family:sans-serif"><div style="font-size:14px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;color:#525252;line-height:1.5"><p style="margin:0"> </p><p style="margin:0">By completing your profile, you&#39;ll increase your chances of meaningful collaborations within our artistic community. Let&#39;s create something remarkable together!</p><p style="margin:0;font-size:14px">
<span style="font-size:15px"> </span></p><p style="margin:0">Best regards,</p><p style="margin:0">The Wondor Team</p><p style="margin:0;font-size:14px"><span style="font-size:15px"> </span></p></div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><div style="background-color:transparent">
    <div style="Margin:0 auto;min-width:320px;max-width:500px;word-wrap:break-word;word-break:break-word;background-color:transparent" class="m_block-grid">
        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
            
            
            <div class="m_col m_num12" style="min-width:320px;max-width:500px;display:table-cell;vertical-align:top">
                <div style="background-color:transparent;width:100%!important">
                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:15px;padding-bottom:15px;padding-right:0px;padding-left:0px">
                        


                        
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</div></div></body></html>
`;
}