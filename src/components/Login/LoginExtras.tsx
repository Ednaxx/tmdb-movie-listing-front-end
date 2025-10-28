import { Link } from "react-router";

const LoginExtras = () => {
  return (
    <>
      <div className="text-center pt-4">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginExtras;
