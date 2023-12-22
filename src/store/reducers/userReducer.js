import {
  GET_ASSESSMENTS_REQUEST,
  GET_GROUPS_REQUEST,
  GET_GROUP_MEMBERS_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  GET_COLORS_REQUEST,
  GET_GAME_INFO,
  GET_PARTICIPANTS_REQUEST,
  GET_PAST_ASSESSMENT,
  GET_ASSESSMENT_DETAILS,
  GET_FACILIATOR_INSTRUCTIONS,
  GET_FILTERED_PARTICIPANTS,
  CHECK_GAME,
  SAVE_SOCKET_REF,
} from '../actions/actionType';

const INITIAL_STATE = {
  isLogin: false,
  userData: null,
  accessToken: '',
  assessments: [],
  groups: [],
  groupMembers: [],
  colors: [],
  gameInfo: [],
  participants: [],
  pastAssessment: [],
  assessmentDetails: null,
  faciliatorInstructions: [],
  hasStartedGame: false,
  socket: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {

  // console.log("actionType",action)
  switch (action.type) {
    case SAVE_SOCKET_REF:
      return {
        ...state,
        socket: action.payload,
      };

    case CHECK_GAME:
      return {
        ...state,
        hasStartedGame: action.payload,
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        name:action.payload.Firstname+" "+action.payload.Lastname,
        isLogin: true,
        accessToken: action.payload.token,
        userData: action.payload,
      };

    case GET_FILTERED_PARTICIPANTS:
      return {
        ...state,
        participants: action.payload,
      };

    case GET_ASSESSMENTS_REQUEST:
      return {
        ...state,
        assessments: action.payload,
      };

    case GET_GROUPS_REQUEST:
      return {
        ...state,
        groups: action?.payload?.map(group => {
          // return { ...group, grade_id: "1".split(',') }
          return { ...group, grade_id: group.group_grade.map(it=>it.GradeID.toString()) }
          // return { ...group, grade_id: group.grade_id.split(',') }
        })
      };

    case GET_GROUP_MEMBERS_REQUEST:
      return {
        ...state,
        groupMembers: action.payload,
      };

    case GET_COLORS_REQUEST:
      return {
        ...state,
        colors: action.payload,
      };

    case GET_GAME_INFO:
      return {
        ...state,
        gameInfo: action.payload,
      };

    case GET_PARTICIPANTS_REQUEST:
      return {
        ...state,
        participants: action.payload.map(it=>{
          console.log("aa",it.GradeID)
          return{
            ...it,
            grade_id:it.GradeID,
            // group_id:it.,
            Gender:it.gender.Gender,
            JerseyColor:it.color.Name,
            grade_name:it.grade.Name
          }
        }),
      };

    case GET_PAST_ASSESSMENT:
      return {
        ...state,
        pastAssessment: action.payload,
      };

    case GET_ASSESSMENT_DETAILS:
      return {
        ...state,
        assessmentDetails: action.payload,
      };

    case LOGOUT_REQUEST:
      return {
        isLogin: false,
        userData: null,
        accessToken: '',
      };

    case GET_FACILIATOR_INSTRUCTIONS:
      return {
        ...state,
        faciliatorInstructions: action.payload,
      };
    default:
      return state;
  }
};
