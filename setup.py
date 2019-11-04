from setuptools import find_packages
from setuptools import setup

setup(
    name="keepingtrack",
    version="0.0.1",
    maintainer="Oscar Bautista",
    maintainer_email="oscar.v.bautista@gmail.com",
    description="A todo list app focusing on nested notes and attachments",
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=["flask"],
    extras_require={"tests": ["pytest", "coverage"]},
    setup_requires=["pytest-runner"],
    tests_require=['pytest']
)