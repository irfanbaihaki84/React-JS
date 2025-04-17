export const questReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_QUEST':
      return {
        ...state,
        quests: [...state.quests, action.payload.newQuest],
      };
    case 'UPDATE_QUEST':
      return {
        ...state,
        quests: state.quests.map((quest) =>
          quest.id === action.payload.questId
            ? { ...quest, ...action.payload.updates }
            : quest
        ),
      };
    case 'DELETE_QUEST':
      return {
        ...state,
        quests: state.quests.filter(
          (quest) => quest.id !== action.payload.questId
        ),
      };
    default:
      return state;
  }
};
