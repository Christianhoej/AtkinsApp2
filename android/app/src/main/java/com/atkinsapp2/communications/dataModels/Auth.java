
package com.atkinsapp2.communications.dataModels;

import com.google.gson.annotations.SerializedName;

@SuppressWarnings("unused")
public class Auth {

    @SerializedName("challenge")
    private String mChallenge;
    @SerializedName("response")
    private String mResponse;

    public String getChallenge() {
        return mChallenge;
    }

    public void setChallenge(String challenge) {
        mChallenge = challenge;
    }

    public String getResponse() {
        return mResponse;
    }

    public void setResponse(String response) {
        mResponse = response;
    }

}
