
package com.atkinsapp2.communications.dataModels;

import com.google.gson.annotations.SerializedName;

import java.util.List;

@SuppressWarnings("unused")
public class Compartment {

    @SerializedName("compartment_id")
    private Long mCompartmentId;
    @SerializedName("depth")
    private Long mDepth;
    @SerializedName("height")
    private Long mHeight;
    @SerializedName("piece_id")
    private String mPieceId;
    @SerializedName("size")
    private Long mSize;
    @SerializedName("size_text")
    private String mSizeText;
    @SerializedName("status")
    private Long mStatus;
    @SerializedName("tokens")
    private List<Token> mTokens;
    @SerializedName("width")
    private Long mWidth;

    public Long getCompartmentId() {
        return mCompartmentId;
    }

    public void setCompartmentId(Long compartmentId) {
        mCompartmentId = compartmentId;
    }

    public Long getDepth() {
        return mDepth;
    }

    public void setDepth(Long depth) {
        mDepth = depth;
    }

    public Long getHeight() {
        return mHeight;
    }

    public void setHeight(Long height) {
        mHeight = height;
    }

    public String getPieceId() {
        return mPieceId;
    }

    public void setPieceId(String pieceId) {
        mPieceId = pieceId;
    }

    public Long getSize() {
        return mSize;
    }

    public void setSize(Long size) {
        mSize = size;
    }

    public String getSizeText() {
        return mSizeText;
    }

    public void setSizeText(String sizeText) {
        mSizeText = sizeText;
    }

    public Long getStatus() {
        return mStatus;
    }

    public void setStatus(Long status) {
        mStatus = status;
    }

    public List<Token> getTokens() {
        return mTokens;
    }

    public void setTokens(List<Token> tokens) {
        mTokens = tokens;
    }

    public Long getWidth() {
        return mWidth;
    }

    public void setWidth(Long width) {
        mWidth = width;
    }

}
