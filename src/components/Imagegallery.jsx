export function DefaultGallery() {
  const data = [
    {
      imageLink:
        "https://media.licdn.com/dms/image/D4E03AQELQkdCab8POg/profile-displayphoto-shrink_800_800/0/1690354944843?e=2147483647&v=beta&t=M6kIWHeefExelivpWI2NxhvUwYueNxk_dVoEa6brtvM",
    },
    {
      imageLink:
      "https://scontent.fjai1-4.fna.fbcdn.net/v/t39.30808-6/437541812_819172273577570_6841140399581971803_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Foec9oqlRxwQ7kNvgG9HGsx&_nc_ht=scontent.fjai1-4.fna&oh=00_AfAPLrjiS5dXty6pjmV4tmTGfdx17p6yrvyAtpxs9ZVXCg&oe=663BC51B"
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
    },
    {
      imageLink:
        "https://demos.creative-tim.com/material-kit-pro/assets/img/examples/blog5.jpg",
    },
    {
      imageLink:
        "https://material-taillwind-pro-ct-tailwind-team.vercel.app/img/content2.jpg",
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1620064916958-605375619af8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1493&q=80",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 ">
      {data.map(({ imageLink }, index) => (
        <div key={index}>
          <img
            className="h-40 w-full max-w-full rounded-lg object-cover object-center"
            src={imageLink}
            alt="gallery-photo"
          />
        </div>
      ))}
    </div>
  );
}
