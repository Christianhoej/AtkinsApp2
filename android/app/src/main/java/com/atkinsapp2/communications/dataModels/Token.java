
package com.atkinsapp2.communications.dataModels;

import com.google.gson.annotations.SerializedName;

import java.util.List;

@SuppressWarnings("unused")
public class Token {

    @SerializedName("auth")
    private List<Auth> mAuth;
    @SerializedName("compartment_id")
    private Long mCompartmentId;
    @SerializedName("token")
    private String mToken;

    public List<Auth> getAuth() {
        return mAuth;
    }

    public void setAuth(List<Auth> auth) {
        mAuth = auth;
    }

    public Long getCompartmentId() {
        return mCompartmentId;
    }

    public void setCompartmentId(Long compartmentId) {
        mCompartmentId = compartmentId;
    }

    public String getToken() {
        return mToken;
    }

    public void setToken(String token) {
        mToken = token;
    }

}
