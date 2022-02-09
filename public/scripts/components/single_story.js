$(() => {
  const nestedTwists = [];

  const $singleStory = $(`
  <section class="single_story">
  <p>Loading...</>
  </section>
  `);

  window.$singleStory = $singleStory;

  window.singleStory = {};

  //CLEAR HELPER
  function clearSingleStory() {
    $singleStory.empty();
  };

  //ADD TO JQUERY HELPER
  function addElement(element) {
    $singleStory.append(element);
  };

  //MAIN FUNCTION DEF
  function addSingleStory(data) {
    let lastAcceptedId = 0;
    const userId = Number(data.user_id); /// CHECK USER IS ALLOWED FOR ACCEPT BUTTONS
    const storyAuthorId = data.story.author_id;
    const isOriginalAuthor = userId === storyAuthorId;

    clearSingleStory();

    const storyEl = story.createStory(data.story, isOriginalAuthor);
    addElement(storyEl);

    for (const twist of data.twists) {
      if (twist.accepted) {
        lastAcceptedId = twist.id;
        const twistEl = window.twist.createAcceptedTwist(twist);
        addElement(twistEl);
      }
    }
<<<<<<< HEAD
=======
    
    // if story is marked 'completed', stop here - do not render newTwistForm or any unacceptedTwists
    if (data.story.completed) {
      return;
    }

    const newTwistFormEl = newTwistForm.createNewTwistForm(data.story);
    addElement(newTwistFormEl);
>>>>>>> 63f3fbf5b6825ba800a4304b26018e12b39627db

    addElement(`<hr style="margin: 2.5rem 0;">`);

    function getNestedTwists(myParent_id) {
      const twists = data.twists.filter(twist => twist.accepted === false);

      for (const twist of twists) {
        if (!twist.accepted && twist.parent_id === myParent_id) {
          nestedTwists.push(twist);
          getNestedTwists(twist.id);
        }
      }
    };

    getNestedTwists(lastAcceptedId);

    const topLevel = nestedTwists[0].depth;
    for (const twist of nestedTwists) {
      const twistEl = window.twist.createUnacceptedTwist(twist, isOriginalAuthor, topLevel);
      addElement(twistEl);
    }
  };

  window.singleStory.clearSingleStory = clearSingleStory;
  window.singleStory.addSingleStory = addSingleStory;

<<<<<<< HEAD
});
=======
  ////////////////////
  // Event Handlers //
  ////////////////////
  
  // Mark a story complete 
  $(".single_story").on("click", '.story__complete_button', function() {
    window.singleStory.clearSingleStory();
    // is the data object available here? can I add it to the event object in jquery?
    completeStory(data.story.story_id) 
      .then(function(response) {
        window.singleStory.clearSingleStory();
        window.singleStory.addSingleStory(response);
        views_manager.show('singleStory');
      });
  });

  // Submit a twist
  const $newTwistForm = $('.new_twist__form')
  
  $newTwistForm.on("submit", function(event) {
    const data = $newTwistForm.serialize();
    event.preventDefault();
    createTwist(data)
      .then(function(response) {
        // hide newTwistForm
        // createUnacceptedTwist
        // append unacceptedTwist below parent?
      })
    
  });

  // Vote for a twist
  $(".single_story").on("click", '.unaccepted_twist__vote_icon', function() {
  });

  // Show the new twist form
  $('.single_story').on('click', '.unaccepted_twist__show_form_button', function() {
  });

  // Accept a twist
  $(".single_story").on('click', '.unaccepted_twist__accept_button', function() {
  });

});
>>>>>>> 63f3fbf5b6825ba800a4304b26018e12b39627db
