import React, { useEffect, useState } from 'react'
import "../../css/Orders.css";
import { RxCrossCircled } from "react-icons/rx";
import { Country, State, City } from 'country-state-city';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderDetails = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        usersname: '',
        mobilenumber: ''
    })
    const [errors, setErrors] = useState({})
    const [orderdetails, setOrderdetails] = useState({
        email: '',
        companyname: '',
        gst: '',
        address: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
        deliveryDetails: {
            address: '',
            country: '',
            state: '',
            city: '',
            postalcode: ''
        }
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [diffaddress, setDiffaddress] = useState(false);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('pki-users')));
    }, [])
    useEffect(() => {
        setCountries(Country.getAllCountries);
    }, [])
    useEffect(() => {
        if (orderdetails.country) {
            const selectedCountry = countries.find(country => country.name === orderdetails.country);
            if (selectedCountry) {
                setStates(State.getStatesOfCountry(selectedCountry.isoCode));
            }
        } else {
            setStates([]);
        }
    }, [orderdetails.country, countries]);
    useEffect(() => {
        if (orderdetails.state) {
            const selectedCountry = countries.find(country => country.name === orderdetails.country);
            const selectedState = states.find(state => state.name === orderdetails.state);
            if (selectedCountry && selectedState) {
                setCities(City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode));
            }
        } else {
            setCities([]);
        }
    }, [orderdetails.state, countries, states]);

    const handleInput = (e, isDelivery = false) => {
        let name = e.target.name;
        let value = e.target.value;
    
        if (isDelivery && diffaddress) {
            // Update delivery address fields
            setOrderdetails((prevOrderdetails) => ({
                ...prevOrderdetails,
                deliveryDetails: {
                    ...prevOrderdetails.deliveryDetails,
                    [name]: value,
                }
            }));
    
            // Set error if delivery address fields are empty and required
            if (value === "" && name !== "companyname" && name !== "gst") {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [`delivery${name}`]: "true"
                }));
                e.target.classList.remove("filled");
            } else {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [`delivery${name}`]: ""
                }));
                e.target.classList.add("filled");
            }
        } else {
            // Update main order details fields
            setOrderdetails((prevOrderdetails) => ({
                ...prevOrderdetails,
                [name]: value,
            }));
    
            // Set error if main address fields are empty and required
            if (value === "" && name !== "companyname" && name !== "gst") {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: "true"
                }));
                e.target.classList.remove("filled");
            } else {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: ""
                }));
                e.target.classList.add("filled");
            }
        }
        console.log(orderdetails);
    };

    const handleRadioChange = (e) => {
        setDiffaddress(e.target.value === 'different-add');
        // Reset delivery details if 'Above address' is selected
        if (e.target.value === 'same-add') {
            setOrderdetails(prevOrderdetails => ({
                ...prevOrderdetails,
                deliveryDetails: {
                    address: prevOrderdetails.address,
                    country: prevOrderdetails.country,
                    state: prevOrderdetails.state,
                    city: prevOrderdetails.city,
                    postalcode: prevOrderdetails.postalcode
                }
            }));
        }
    };

    const handelsubmit = async(e) => {
        e.preventDefault();
        const amount=2775;
        try {
            const response = await axios.post(
              'http://localhost:2705/api/order/create_order',
              { amount: amount },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            // Handle success
            console.log(response.data);
            if(response.data.status == "created")
            {
                console.log("next");
                let options = {
                    "key": "rzp_test_VtabkGRGa9SEhd",
                    "amount": "2775",
                    "currency": "INR",
                    "name": "JIO PKI SIM",
                    "description": "Test Transaction",
                    "image": "https://example.com/your_logo",
                    "order_id": response.data.id,
                    "handler": function (response){
                        console.log(response);
                    console.log(response.razorpay_payment_id);
                    console.log(response.razorpay_order_id);
                    console.log(response.razorpay_signature);

                    const payment={payment_id:response.razorpay_payment_id,order_id:response.razorpay_order_id,
                    razorpay_signature:response.razorpay_signature};

                    localStorage.setItem("payment",JSON.stringify(payment));

                    // alert("Payment Sucessfull");
                    navigate('/payment_sucessfull');
                    },
                    "prefill": {
                    "name": user.usersname,
                    "email": orderdetails.email,
                    "contact": user.mobilenumber
                    },
                    "notes": {
                    "address": "JIO"
                    },
                    "theme": {
                    "color": "#3399cc"
                    }
                    };
               const rzp1 = new Razorpay(options);
               rzp1.open();
                    rzp1.on('payment.failed', function (response){
                    console.log(response.error.code);
                    console.log(response.error.description);
                    console.log(response.error.source);
                    console.log(response.error.step);
                    console.log(response.error.reason);
                    console.log(response.error.metadata.order_id);
                    console.log(response.error.metadata.payment_id);
                    alert("oops payment failed");
                    });
                    
            }
          } catch (error) {
            // Handle error
            console.error("Error creating order:", error);
          }


    };

    return (
        <div className='order-details'>

            <div className="left-order-part">

                <h3 className='name-heading'>Hello <strong>{user.usersname}</strong></h3>
                <p>You are one step away from completing the purchase.</p>
                <p className='order-note'><strong>Note:</strong> Please enter your billing inforamtion below to complete your digital signature SIM (PKI-SIM) purchase. Once you complete your purchase, you will be able to enter DSC application inforamtion which can be different than the billing information.</p>
                <p className='mobile-number'>Mobile Number : <strong>{user.mobilenumber}</strong></p>

                <form className='order-form' onSubmit={handelsubmit}>
                    <div className='input-container'>
                        <div className={`input-box ${errors.email ? 'errors-bar' : ''}`}>
                            <input id="email" type="text" name="email" required="required" value={orderdetails.email} onChange={handleInput} />
                            <label htmlFor="email">E-mail *</label>
                        </div>
                        {errors.email && <span className="error-message"><RxCrossCircled />Enter E-mail</span>}
                    </div>
                    <div className='input-container'>
                        <div className={`input-box ${errors.companyname ? 'errors-bar' : ''}`}>
                            <input id="companyname" type="text" name="companyname" value={orderdetails.companyname} onChange={handleInput} />
                            <label htmlFor="companyname">Company Name</label>
                        </div>
                    </div>
                    <div className='input-container'>
                        <div className={`input-box ${errors.gst ? 'errors-bar' : ''}`}>
                            <input id="gst" type="text" name="gst" value={orderdetails.gst} onChange={handleInput} />
                            <label htmlFor="gst">Is GSTIN Available?</label>
                        </div>

                    </div>
                    <div className='input-container'>
                        <div className={`input-box ${errors.address ? 'errors-bar' : ''}`}>
                            <input id="gst" type="text" name="address" required="required" value={orderdetails.address} onChange={handleInput} />
                            <label htmlFor="address">Address*</label>
                        </div>
                        {errors.address && <span className="error-message"><RxCrossCircled />Enter Address</span>}
                    </div>
                    {/*Country Dropdown*/}
                    <div className='input-container'>
                        <div className={`input-box ${errors.country ? 'errors-bar' : ''}`}>
                            <select id="country" name="country" value={orderdetails.country} onChange={handleInput}>
                                <option value="">Select Country</option>
                                {countries && countries.map(country => (
                                    <option key={country.isoCode} value={country.name}>{country.name}</option>
                                ))}
                            </select>
                        </div>
                        {errors.country && <span className="error-message"><RxCrossCircled />Enter Country</span>}
                    </div>
                    {/* State Dropdown */}
                    <div className='input-container'>
                        <div className={`input-box ${errors.state ? 'errors-bar' : ''}`}>
                            <select name="state" value={orderdetails.state} onChange={handleInput} disabled={!orderdetails.country}>
                                <option value="">Select State</option>
                                {states.map(state => (
                                    <option key={state.isoCode} value={state.name}>{state.name}</option>
                                ))}
                            </select>
                        </div>
                        {errors.state && <span className="error-message"><RxCrossCircled />Enter state</span>}
                    </div>
                    {/* District Dropdown */}
                    <div className='input-container'>
                        <div className={`input-box ${errors.city ? 'errors-bar' : ''}`}>
                            <select name="city" value={orderdetails.city} onChange={handleInput} disabled={!orderdetails.state}>
                                <option value="">Select City</option>
                                {cities.map(city => (
                                    <option key={city.isoCode} value={city.name}>{city.name}</option>
                                ))}
                            </select>
                        </div>
                        {errors.city && <span className="error-message"><RxCrossCircled />Enter City</span>}
                    </div>
                    <div className='input-container'>
                        <div className={`input-box ${errors.postalcode ? 'errors-bar' : ''}`}>
                            <input id="pincode" type="number" name="pincode" required="required" value={orderdetails.postalcode} onChange={handleInput} />
                            <label htmlFor="pincode">Pincode</label>
                        </div>
                        {errors.postalcode && <span className="error-message"><RxCrossCircled />Enter Pincode</span>}
                    </div>

                    <strong><p className='dlv-heading'>Dilevery address of the PKI-SIM</p></strong>

                    <div className="dilevery-add">
                        <p>Do you want us to send PKI-SIM to :</p>
                        <input type="radio" id="same-add" name="dilever-add" value="same-add" onChange={handleRadioChange} />
                        <label htmlFor="same-add">Above address</label>
                        <input type="radio" id="different-add" name="dilever-add" value="different-add" onChange={handleRadioChange} />
                        <label htmlFor="different-add">Different address</label>
                    </div>
                    {diffaddress && (<>
                        <div className='input-container'>
                            <div className={`input-box ${errors.deliveryAddress ? 'errors-bar' : ''}`}>
                                <input id="dlyaddress" type="text" name="address" required="required" value={orderdetails.deliveryDetails.address} onChange={(e) => handleInput(e, true)} />
                                <label htmlFor="dlyaddress">Address*</label>
                            </div>
                            {errors.deliveryAddress && <span className="error-message"><RxCrossCircled />Enter delivery Address</span>}
                        </div>
                        {/*Country Dropdown*/}
                        <div className='input-container'>
                            <div className={`input-box ${errors.deliveryCountry ? 'errors-bar' : ''}`}>
                                <select id="dlycountry" name="country" value={orderdetails.deliveryDetails.country} onChange={(e) => handleInput(e, true)}>
                                    <option value="">Select Country</option>
                                    {countries && countries.map(country => (
                                        <option key={country.isoCode} value={country.name}>{country.name}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.deliveryCountry && <span className="error-message"><RxCrossCircled />Enter Country</span>}
                        </div>
                        {/* State Dropdown */}
                        <div className='input-container'>
                            <div className={`input-box ${errors.deliveryState ? 'errors-bar' : ''}`}>
                                <select name="state" value={orderdetails.deliveryDetails.state} onChange={(e) => handleInput(e, true)} disabled={!orderdetails.deliveryDetails.country}>
                                    <option value="">Select State</option>
                                    {states.map(state => (
                                        <option key={state.isoCode} value={state.name}>{state.name}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.deliveryState && <span className="error-message"><RxCrossCircled />Enter State</span>}
                        </div>
                        {/* City Dropdown */}
                        <div className='input-container'>
                            <div className={`input-box ${errors.deliveryCity ? 'errors-bar' : ''}`}>
                                <select name="city" value={orderdetails.deliveryDetails.city} onChange={(e) => handleInput(e, true)} disabled={!orderdetails.deliveryDetails.state}>
                                    <option value="">Select City</option>
                                    {cities.map(city => (
                                        <option key={city.isoCode} value={city.name}>{city.name}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.deliveryCity && <span className="error-message"><RxCrossCircled />Enter City</span>}
                        </div>
                        <div className='input-container'>
                            <div className={`input-box ${errors.deliveryPincode ? 'errors-bar' : ''}`}>
                                <input id="dlypincode" type="number" name="postalcode" required="required" value={orderdetails.deliveryDetails.postalcode} onChange={(e) => handleInput(e, true)} />
                                <label htmlFor="dlypincode">Pincode</label>
                            </div>
                            {errors.deliveryPincode && <span className="error-message"><RxCrossCircled />Enter Pincode</span>}
                        </div>
                    </>)}

                    <p className='recaptcha'>Protected by reCAPTCHA and the Google <a href="">Privacy Policy</a> and <a href="">Terms of service</a> apply.</p>

                    <div className="captcha-box"></div>

                    <div className="order-submit-button-div">
                    <button type='submit' className='order-submit-button' onClick={handelsubmit}>Proceed</button>
                    </div>
                </form>
            </div>

            <div className="right-order-part">
                <div className="order-part-box">

                    <h4 className='product-summary-heading'>Product Summary</h4>

                    <ul>
                        <li>Class Type <span className='text-bold'>Class 2</span></li>
                        <li>User Type <span className='text-bold'>Individal</span></li>
                        <li>SIM Type <span className='text-bold'>PKI-SIM</span></li>
                        <li>Validity <span className='text-bold'>2 Years</span></li>
                    </ul>
                    <hr/>
                    <din className="coupon-box">
                        <p>Have a coupon code?<span>Apply Coupon</span></p>
                        <p className='apply-coupon'>Apply coupon code EM10 to get 10%</p>
                    </din>
                    <hr/>
                    <div className='price-details'>
                        <ul>
                            <li className='text-bold'>Price Details</li>
                            <li>SIM Cost<span>₹ 3500</span></li>
                            <li>Discount<span style={{color:'green'}}>-₹ 175</span></li>
                            <li>Digital Signature Cost<span>₹ 410</span></li>
                            <li className='text-bold'>Total Amount*<span className='text-bold'>₹ 3735</span></li>
                        </ul>
                    </div>
                    <div className='free-items'>
                        <ul>
                            <li className='text-bold' style={{color:'rgb(227, 159, 33)'}}>Free Items Added to Cart</li>
                            <li>Free AADHAAR eSign for 1 year<span>₹ 3500</span></li>
                            <li>Free eCmmerce Voucher<span>₹ 500</span></li>
                            <li>Free Digital Signature Replacment<span>₹ 1500</span></li>
                            <li>Product Discount<span>₹ 175</span></li>
                            <li className='text-bold' style={{color:'rgb(227, 159, 33)'}}>Total Free Item Added<span className='text-bold'>₹ 2775</span></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OrderDetails
