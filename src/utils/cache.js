const subjects = {
  loaded: false,
  data: []
}

const chapters = {

}

export const getCachedSubjects = () => {
  return subjects;
};

export const setCachedSubjects = (data) => {
  subjects.loaded = true;
  subjects.data = data
}

export const getCachedChapters = (subject) => {
  if (chapters[subject] === undefined) {
    return {
      loaded: false,
      data: []
    };
  }
  return chapters[subject]
};

export const setCachedChapters = (subject, data) => {
  chapters[subject] = {
    loaded: true,
    data: data
  }
}