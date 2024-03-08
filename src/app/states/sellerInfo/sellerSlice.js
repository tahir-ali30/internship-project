import { createSlice } from "@reduxjs/toolkit"

const intialState = {
    sellerData: {
        personalDetails: {
            first_name: null,
            last_name: null,
            email: null,
            password: null,
            phone: null,
            country: null,
            state: null,
            city: null,
            address: null,
            nationalId: null,
        },
        bankDetails: {
            bank: null,
            accountNumber: null,
            accountTitle: null,    
        },
        professionalDetails: {
            shopName: null,
            bussinessEmail: null,
            businessPhone: null,
            businessAddress: null,
            nationalTaxNumber: null,
            salesTaxNumber: null,
        },
        cnicDetails: {
            cnic_front: null,
            cnic_back: null,
        }
    }
}

const sellerSlice = createSlice({
    name: 'seller',
    initialState: intialState,
    reducers: {
        setSellerPersonalData: (state, action) => {
            state.sellerData.personalDetails = action.payload;
        },
        setSellerBankData: (state, action) => {
            state.sellerData.bankDetails = action.payload;
        },
        setSellerProfessionalData: (state, action) => {
            state.sellerData.professionalDetails = action.payload;
        },
        setSellerCnicData: (state, action) => {
            state.sellerData.cnicDetails = action.payload;
        }
    },
})

export const { setSellerPersonalData, setSellerBankData, setSellerProfessionalData, setSellerCnicData } = sellerSlice.actions;

export default  sellerSlice.reducer;