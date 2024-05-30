export async function GET(request: Request) {
  return Response.json(
    {
      statusCode: 200,
      message: "API SERVER RUNNING SUCCESS",
    },
    {
        status: 200,
        statusText : 'OKE GASS LETS GOWWWW!!!!'
    }
  );
}
