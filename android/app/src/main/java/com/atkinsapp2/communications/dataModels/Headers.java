
package com.atkinsapp2.communications.dataModels;

import com.google.gson.annotations.SerializedName;

@SuppressWarnings("unused")
public class Headers {

    @SerializedName("Access-Control-Allow-Origin")
    private String mAccessControlAllowOrigin;
    @SerializedName("X-Requested-With")
    private String mXRequestedWith;

    public String getAccessControlAllowOrigin() {
        return mAccessControlAllowOrigin;
    }

    public void setAccessControlAllowOrigin(String accessControlAllowOrigin) {
        mAccessControlAllowOrigin = accessControlAllowOrigin;
    }

    public String getXRequestedWith() {
        return mXRequestedWith;
    }

    public void setXRequestedWith(String xRequestedWith) {
        mXRequestedWith = xRequestedWith;
    }

}
