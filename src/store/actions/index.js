import {
  GET_ASSESSMENTS_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  GET_GROUPS_REQUEST,
  GET_GROUP_MEMBERS_REQUEST,
  GET_COLORS_REQUEST,
  SUBMIT_RESULT,
  GET_GAME_INFO,
  GET_PARTICIPANTS_REQUEST,
  GET_PAST_ASSESSMENT,
  GET_ASSESSMENT_DETAILS,
  GET_FACILIATOR_INSTRUCTIONS,
  GET_FILTERED_PARTICIPANTS,
  CHECK_GAME,
  SAVE_SOCKET_REF,
  GET_LOGIN_IMG,
  GET_EVENTS,
  GET_VIDEO,
  GET_NINTY_FIVE,
} from './actionType';
import axios from 'axios';
import {apiUrl,imageUrl} from '../../config';
import {showMessage, hideMessage} from 'react-native-flash-message';

export const checkGame = bool => dispatch => {
  try {
    dispatch({
      type: CHECK_GAME,
      payload: bool,
    });
  } catch (err) {
    // console.log(err);
  }
};

export const saveSocketRef = socketRef => dispatch => {
  dispatch({
    type: SAVE_SOCKET_REF,
    payload: socketRef,
  });
};

export const sendFCMToken = (data, accessToken) => async dispatch => {
  try {
    const URL = `${apiUrl}/get-fcm-token`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.post(URL, data, headers);
    // console.log(response.data);
  } catch (err) {
    // console.log(err?.response?.data?.message);
  }
};
export const loginRequest = (data, onLoginFailed,device_id,device_name) => async dispatch => {
  try {
    const URL = `${apiUrl}/login`;
    const response = await axios.post(URL, data);
    if (response.data.success) {
      // console.log(response.data.data,"======================")
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${response.data.data?.token}`,
        },
      };
      console.log(device_id,device_name)
      //// device registration
      axios.post(`${apiUrl}/device_info`, {device_id,device_name},headers)
      .then((res)=>{
        console.log("register device",res.data)
      })
      .catch(err=>{
        console.log('device register Error',err?.response?.data)
      })

      //////
      dispatch({
        type: LOGIN_REQUEST,
        payload: response.data.data,
      });
    } else {
    console.log(response.data)

      onLoginFailed();
      showMessage({
        message:
          response.data.message || response.data.msg || 'Something went wrong',
        type: 'danger',
      });
    }
  } catch (err) {
    showMessage({
      message:err?.response?.data?.message,
      type: 'danger',
    });
    onLoginFailed();
    // console.log(err);
  }
};

export const getAssessments = accessToken => async dispatch => {
  try {
    const URL = `${apiUrl}/assessment`;
    const URL2 = `${apiUrl}/ninty_five`;

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(URL, headers);
    const response2 = await axios.get(URL2, headers);

    if (response.data.success) {
      // console.log("daaatop333",response2.data.data)
      // console.log("daa",response.data.data.map((it,i)=>{
      //   const d=response2.data.data.find(({AssessmentID})=>AssessmentID==it.id)
      //   if(d){
      //     return {...it,times:d}
      //   }else{
      //     return it
      //   }
      // }))
      dispatch({
        type: GET_ASSESSMENTS_REQUEST,
        payload: response.data.data.map((it,i)=>{
          const d=response2.data.data.find(({AssessmentID})=>AssessmentID==it.id)
          if(d){
            return {...it,times:d}
          }else{
            return it
          }
        }),
      });
      dispatch({
        type:GET_NINTY_FIVE,
        payload:response2.data.data
      })
    } else {
      dispatch({
        type: GET_ASSESSMENTS_REQUEST,
        payload: [],
      });
      showMessage({
        message:
          response?.data.data?.error ||
          response.data.message ||
          response.data.msg ||
          'Something went wrong',
        type: 'danger',
      });
    }
  } catch (err) {
    showMessage({
      message: 'Network Error',
      type: 'danger',
    });
    // console.log(err?.response?.data?.msg || err?.response?.data?.message);
  }
};

export const getGroups = accessToken => async dispatch => {
  try {
    const URL = `${apiUrl}/group`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(URL, headers);
    if (response.data.success) {
      dispatch({
        type: GET_GROUPS_REQUEST,
        payload: response.data.data,
      });
    } else {
      dispatch({
        type: GET_GROUPS_REQUEST,
        payload: [],
      });
      showMessage({
        message:
          response?.data.data?.error ||
          response.data.message ||
          response.data.msg ||
          'Something went wrong',
        type: 'danger',
      });
    }
  } catch (err) {
    showMessage({
      message: 'Network Error',
      type: 'danger',
    });
    // console.log(
    //   err?.response?.data?.msg || err?.response?.data?.message,
    //   'GET_GROUPS_REQUEST',
    // );
  }
};

export const getGroupMembers = (data, accessToken) => async dispatch => {
  try {
    const URL = `${apiUrl}/get-participant`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.post(URL, data, headers);
    if (response.data.success) {
      dispatch({
        type: GET_GROUP_MEMBERS_REQUEST,
        payload: response.data.data,
      });
    } else {
      dispatch({
        type: GET_GROUP_MEMBERS_REQUEST,
        payload: [],
      });
      // showMessage({
      //   message:
      //     response?.data.data?.error ||
      //     response.data.message ||
      //     response.data.msg ||
      //     'Something went wrong',
      //   type: 'danger',
      // });
    }
  } catch (err) {
    showMessage({
      message: 'Network Error',
      type: 'danger',
    });
    // console.log(
    //   err?.response?.data?.msg || err?.response?.data?.message,
    //   'GET_GROUP_MEMBERS_REQUEST',
    // );
  }
};

export const getFilteredParticipants =
  (data, accessToken, onSuccess) => async dispatch => {
    // console.log(data, '===', accessToken);
    // alert(JSON.stringify(data))
    try {
      const URL = `${apiUrl}/participants/filter`;
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.post(URL, data, headers);
      // console.log(response.data);
      // alert(JSON.stringify(response.data))
      onSuccess();
      if (response.data.success) {
        dispatch({
          type: GET_FILTERED_PARTICIPANTS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: GET_FILTERED_PARTICIPANTS,
          payload: [],
        });
        showMessage({
          message:
            response?.data.data?.error ||
            response.data.message ||
            response.data.msg ||
            'Something went wrong',
          type: 'danger',
        });
      }
    } catch (err) {
      showMessage({
        message: 'Network Error',
        type: 'danger',
      });
      // console.log(
      //   err?.response?.data?.msg || err?.response?.data?.message,
      //   'GET_FILTERED_PARTICIPANTS',
      //   err,
      // );
    }
  };

export const getColors = accessToken => async dispatch => {
  try {
    const URL = `${apiUrl}/color`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(URL, headers);
    if (response.data.success) {
      dispatch({
        type: GET_COLORS_REQUEST,
        payload: response.data.data,
      });
    } else {
      showMessage({
        message:
          response.data.message || response.data.msg || 'Something went wrong',
        type: 'danger',
      });
    }
  } catch (err) {
    // console.log(
    //   err?.response?.data?.msg || err?.response?.data?.message,
    //   'GET_COLORS_REQUEST',
    // );
  }
};

export const logoutRequest = (accessToken,device_id) => async dispatch => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axios.post(`${apiUrl}/remove_device`,{device_id},headers)
  .then(()=>{
    dispatch({
      type: LOGOUT_REQUEST,
    })
  }).catch(()=>{
    dispatch({
      type: LOGOUT_REQUEST,
    })
  })
};

export const submitResult =
  (data, accessToken, onSuccess) => async dispatch => {
    try {
      const URL = `${apiUrl}/assessmentresult/add`;
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.post(URL, data, headers);
      if (response.data.success) {
        showMessage({
          message: 'Score Result Saved!',
          type: 'success',
        });
        onSuccess();
        // dispatch({
        //   type: SUBMIT_RESULT,
        //   payload: response.data.data,
        // });
      } else {
        // alert(JSON.stringify(response.data))
        showMessage({
          message:
            response.data.message ||
            response.data.msg ||
            'Something went wrong',
          type: 'danger',
        });
      }
    } catch (err) {
      // console.log("err",err.response?.data)
      showMessage({
        message: 'Network Error',
        type: 'danger',
      });
      // console.log(err?.response?.data?.msg || err?.response?.data?.message);
    }
  };

export const getGameInfo = accessToken => async dispatch => {
  try {
    const URL = `${apiUrl}/assessmentscore`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(URL, headers);
    if (response.data.success) {
      dispatch({
        type: GET_GAME_INFO,
        payload: response.data.data,
      });
    } else {
      showMessage({
        message:
          response.data.message || response.data.msg || 'Something went wrong',
        type: 'danger',
      });
    }
  } catch (err) {
    // console.log(err?.response?.data?.msg || err?.response?.data?.message);
  }
};

export const getParticipants = (accessToken,group_id)=> async dispatch => {
  console.log("aaa",accessToken)
  try {
    const URL = `${apiUrl}/participant`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.post(URL, {group_id},headers);
    if (response.data.success) {
      dispatch({
        type: GET_PARTICIPANTS_REQUEST,
        payload: response.data.data,
      });
    } else {
      dispatch({
        type: GET_PARTICIPANTS_REQUEST,
        payload: [],
      });
      // showMessage({
      //   message:
      //     response?.data.data?.error ||
      //     response.data.message ||
      //     response.data.msg ||
      //     'Something went wrong',
      //   type: 'danger',
      // });
    }
  } catch (err) {
    showMessage({
      message: 'Network Error',
      type: 'danger',
    });
    console.log(
      'Participants Screen Error: ',
      err?.response?.data?.msg || err?.response?.data?.message,
    );
  }
};

export const getPastAssessment = (data, accessToken) => async dispatch => {
  // console.log(data);
  // alert(JSON.stringify(data))
  try {
    const URL = `${apiUrl}/assessment_results_participant/${data.id}`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(URL,headers);
    if (response.data.success) {
      // console.log(response.data.data, 'Data of past assessment');
      dispatch({
        type: GET_PAST_ASSESSMENT,
        payload: response.data.data,
      });
    } else {
      dispatch({
        type: GET_PAST_ASSESSMENT,
        payload: [],
      });
      // showMessage({
      //   message:
      //     response?.data.data?.error ||
      //     response.data.message ||
      //     response.data.msg ||
      //     'Something went wrong',
      //   type: 'danger',
      // });
    }
  } catch (err) {
    showMessage({
      message: 'Network Error1',
      type: 'danger',
    });
    console.log(err?.response?.data?.msg || err?.response?.data?.message);
  }
};

export const forgetPassword = (data, onFailed, onSuccess) => async dispatch => {
  try {
    const URL = `${apiUrl}/request_otp`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(URL, data, headers);

    if (response.data.success) {
      showMessage({
        message: response?.data?.message || response?.data?.msg,
        type: 'success',
      });
      onSuccess();
    } else {
      onFailed();
      showMessage({
        message:
          response?.data?.data?.error ||
          response?.data?.message ||
          response?.data?.msg ||
          'Something went wrong',
        type: 'danger',
      });
    }
  } catch (err) {
    console.log("err",err.response?.data)
    onFailed();
    showMessage({
      message: 'Network Error',
      type: 'danger',
    });
    console.log(err?.response?.data?.msg || err?.response?.data?.message, err);
  }
};

export const getAssessmentDetails = (id, accessToken) => async dispatch => {
  try {
    const URL = `${apiUrl}/assessment/${id}`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(URL, headers);
    // console.log("WWwwwwwwwwwwwwwwwwwwww", response.data);
    if (response.data.success) {
      dispatch({
        type: GET_ASSESSMENT_DETAILS,
        payload: response.data.data[0],
      });
    } else {
      dispatch({
        type: GET_ASSESSMENT_DETAILS,
        payload: null,
      });
      showMessage({
        message:
          response?.data.data?.error ||
          response.data.message ||
          response.data.msg ||
          'Something went wrong',
        type: 'danger',
      });
    }
  } catch (err) {
    showMessage({
      message: 'Network Error',
      type: 'danger',
    });
    console.log(
      err?.response?.data?.msg || err?.response?.data?.message || err,
    );
  }
};

export const verifyOtp = (data, onFailed, onSuccess) => async dispatch => {
  try {
    const URL = `${apiUrl}/verify_otp`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(URL, data, headers);

    if (response.data.success) {
      showMessage({
        // message: response?.data?.message || response?.data?.msg,
        message:"Otp match successfully",
        type: 'success',
      });
      onSuccess();
    } else {
      onFailed();
      showMessage({
        message:
          response?.data?.data?.error ||
          response?.data?.message ||
          response?.data?.msg ||
          'Something went wrong',
        type: 'danger',
      });
    }
  } catch (err) {
    onFailed();
    showMessage({
      message: 'OTP is not Correct',
      type: 'danger',
    });
    console.log(err?.response?.data?.msg || err?.response?.data?.message, err);
  }
};

export const resetPassword = (data, onFailed, onSuccess) => async dispatch => {
  try {
    const URL = `${apiUrl}/reset-password`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(URL, data, headers);

    if (response.data.success) {
      showMessage({
        message: response?.data?.message || response?.data?.msg,
        type: 'success',
      });
      onSuccess();
    } else {
      onFailed();
      showMessage({
        message:
          response?.data?.data?.error ||
          response?.data?.message ||
          response?.data?.msg ||
          'Something went wrong',
        type: 'danger',
      });
    }
  } catch (err) {
    onFailed();
    showMessage({
      message: err?.response?.data?.msg || err?.response?.data?.message,
      type: 'danger',
    });
    console.log(err?.response?.data?.msg || err?.response?.data?.message, err);
  }
};

export const getFaciliatorInstructions = accessToken => async dispatch => {
  try {
    const URL = `${apiUrl}/facilitator/instruction`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(URL, headers);
    if (response.data.success) {
      dispatch({
        type: GET_FACILIATOR_INSTRUCTIONS,
        payload: response.data.data,
      });
    } else {
      dispatch({
        type: GET_FACILIATOR_INSTRUCTIONS,
        payload: [],
      });
      showMessage({
        message:
          response.data.message || response.data.msg || 'Something went wrong',
        type: 'danger',
      });
    }
  } catch (err) {
    showMessage({
      message: 'Network Error',
      type: 'danger',
    });
    console.log(err?.response?.data?.msg || err?.response?.data?.message);
  }
};

export const changeStatus = (id,accessToken) => async dispatch => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const res=await axios.post(`${apiUrl}/participant_status`,{id},headers)
  return res
}

export const getLoginImg = id => async dispatch => {
  const res=await axios.post(`${apiUrl}/logo`,{device_id:id})
  dispatch({
    type:GET_LOGIN_IMG,
    payload:imageUrl+"/logo/"+res.data?.data[0]?.light_mode_logo
  })
  dispatch({
    type:GET_VIDEO,
    payload:{...res.data?.data[1],videoUrl:imageUrl+"/logo/"+res.data?.data[0]?.video}
  })
}
export const videoWatched = id => async dispatch => {
  return axios.post(`${apiUrl}/tutorial_watch`,{is_watch:true,device_id:id})
}
export const getEvents = accessToken => async dispatch => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const res=await axios.get(`${apiUrl}/event`,headers)
  dispatch({
    type:GET_EVENTS,
    payload:res.data?.data
  })
}

export const SaveDeviceCount = (login_count,accessToken) => async dispatch => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axios.post(`${apiUrl}/login_count`,{login_count},headers)
}

export const getDevicesInfo = (accessToken) => async dispatch => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axios.get(`${apiUrl}/login_devices`,headers)
}

export const checkLicense = (accessToken) => async dispatch => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axios.get(`${apiUrl}/license_valid`,headers)
}