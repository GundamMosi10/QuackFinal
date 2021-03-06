const post_id = document.querySelector('input[name="post-id"]').value;

const editFormHandler = async function(event) {
    event.preventDefault();
  
  
    const post = document.querySelector('textarea[name="post-body"]').value;
  
    await fetch(`/api/post/${post_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        post
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    document.location.replace('/dashboard');
};
  
const deleteClickHandler = async function() {
  await fetch(`/api/post/${post_id}`, {
    method: 'DELETE'
  });
  
  document.location.replace('/dashboard');
};
  
document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler);

document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);