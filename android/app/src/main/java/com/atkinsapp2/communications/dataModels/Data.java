
package com.atkinsapp2.communications.dataModels;

import com.google.gson.annotations.SerializedName;

import java.util.List;

@SuppressWarnings("unused")
public class Data {

    @SerializedName("compartments")
    private List<Compartment> mCompartments;
    @SerializedName("headers")
    private Headers mHeaders;

    public List<Compartment> getCompartments() {
        return mCompartments;
    }

    public void setCompartments(List<Compartment> compartments) {
        mCompartments = compartments;
    }

    public Headers getHeaders() {
        return mHeaders;
    }

    public void setHeaders(Headers headers) {
        mHeaders = headers;
    }

}
